import {gql} from 'apollo-boost';

export const GET_ALL_PETS = gql`
    query {
        getAllPets {
            name
            desc
            text
            category
            likes
            createdDate
        }
    }
`

export const SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signupUser(username:$username, password: $password, email: $email) {
            token
        }
    }
`