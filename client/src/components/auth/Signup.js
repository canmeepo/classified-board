import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {SIGNUP_USER} from '../../quries';
import { withRouter } from 'react-router-dom';
import Error from '../Error';

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
}

class Signup extends Component {
    state = {...initialState};

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }
    
    handleSubmit = (event, signupUser) => {
        event.preventDefault();

        signupUser().then(async data => {
            console.log(data)
            localStorage.setItem('token', data.data.signinUser.token)
            await this.props.refetch();
            this.clearState()
            this.props.history.push('/')
        })
    }

    clearState = () => {
        this.setState({...initialState})
    }

    validateForm = () => {
        const {username, email, password, passwordConfirmation} = this.state;

        const valid = username && email && password && passwordConfirmation && password === passwordConfirmation;

        return !valid;
    }

    render() {
        const {username, email, password, passwordConfirmation} = this.state;
        return (
            <div>
                <div>signup</div>
                <Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
                    {(signupUser, {data, loading, error}) => {
                        return (
                            <form onSubmit={e => this.handleSubmit(e, signupUser)}>
                                <input type="text" name="username" placeholder="username" value={username} onChange={this.handleChange}/>
                                <input type="email" name="email" placeholder="email" value={email} onChange={this.handleChange}/>
                                <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange}/>
                                <input type="password" name="passwordConfirmation" placeholder="password" value={passwordConfirmation} onChange={this.handleChange}/>
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

export default withRouter(Signup);