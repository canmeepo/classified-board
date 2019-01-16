import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {SIGNUP_USER} from '../../quries'

class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }
    
    handleSubmit = (event, signupUser) => {
        event.preventDefault();

        signupUser().then(data => {
            console.log(data)
        })
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
                                <button>submit</button>
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default Signup;