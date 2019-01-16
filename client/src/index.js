import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import App from './components/App';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';


const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql'
})

const Root = () => (
    <Router>
        <Switch>
            <Route path={'/'} exact component={App} />
            <Route path={'/signin'} component={Signin} />
            <Route path={'/signup'} component={Signup} />
            <Redirect to={'/'} />
        </Switch>
    </Router>
)

ReactDOM.render(
<ApolloProvider client={client} >
<Root/> 
</ApolloProvider>, document.getElementById('root'));
