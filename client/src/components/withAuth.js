import React from 'react';
import { Query } from 'react-apollo'
import { Redirect } from 'reacr-router-dom'
import { GET_CURRENT_USER } from '../quries'

const withAuth = condition => Component => props => {
    return (
        <Query>
            {(data, loading) => {
                if (loading) return null;

                return condition(data) ? <Component {...props} /> : <Redirect to="/" />
            }}
        </Query>
    )
}

export default withAuth;