import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import App from './components/App';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Session from './components/Session';
import Header from './components/Header'
import Search from './components/pets/Search'
import AddPet from './components/pets/AddPet'
import Profile from './components/profile/profile'
import PetPage from './components/pets/PetPage'



const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operations => {
        const token = localStorage.getItem('token')
        operations.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError: ({networkError}) => {
        if (networkError) {
            console.log('network error', networkError);

            // if (networkError.statusCode === 401) {
            //     localStorage.removeItem('token')
            // }
        }
    }
})

const Root = ({refetch, session}) => (
    <Router>
        <Fragment>
        <Header session={session}/>
        <Switch>
            <Route path={'/'} exact component={App} />
            <Route path={'/signin'} render={() => <Signin refetch={refetch}/>}/>
            <Route path={'/signup'} render={() => <Signup refetch={refetch}/>}/>
            <Route path={'/search'} component={Search} />
            <Route path={'/profile'} component={Profile} />
            <Route path={'/pets/add'} render={() => <AddPet session={session}/> } />
            <Route path={'/pets/:_id'} component={PetPage} />
            <Redirect to={'/'} />
        </Switch>
        </Fragment>
    </Router>
)

const RootWithSession = Session(Root);

ReactDOM.render(
<ApolloProvider client={client} >
<RootWithSession /> 
</ApolloProvider>, document.getElementById('root'));
