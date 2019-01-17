import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {SIGNIN_USER} from '../../quries';
import Error from '../Error';

const initialState = {
    email: '',
    password: ''
}

class Signin extends Component {

    state = {...initialState};

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }
    
    handleSubmit = (event, signinUser) => {
        event.preventDefault();

        signinUser().then(async data => {
            console.log(data.data)
            localStorage.setItem('token', data.data.signinUser.token)
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/')
        })
    }

    clearState = () => {
        this.setState({...initialState})
    }

    validateForm = () => {
        const {email, password} = this.state;

        const valid = email && password

        return !valid;
    }

    render() {
        const {email, password} = this.state;

        return (
            <div>
                <div>signin</div>
                 <Mutation mutation={SIGNIN_USER} variables={{email, password}}>
                    {(signinUser, {data, loading, error}) => {
                        return (
                            <form onSubmit={e => this.handleSubmit(e, signinUser)}>
                                <input type="email" name="email" placeholder="email" value={email} onChange={this.handleChange}/>
                                <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange}/>
                                <button disabled={loading || this.validateForm()}>submit</button>
                                {error && <Error error={error} />}
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default withRouter(Signin);