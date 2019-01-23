import {gql} from 'apollo-boost';

export const GET_ALL_PETS = gql`
    query {
        getAllPets {
            _id
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

export const SIGNIN_USER = gql`
    mutation($email: String!, $password: String!) {
        signinUser(password: $password, email: $email) {
            token
        }
    }
`

export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            username
            email
            createdDate
            favorites {
                _id
                name
            }
        }
    }
`

export const GET_USER_POSTS = gql`
    query($username: String!) {
        getUserPosts(username: $username) {
            _id
            name
        }
    }

`

export const GET_PET = gql`
    query($_id: ID!) {
        getPet(_id: $_id) {
            name
            text
            desc
            _id
            text
            username
        }
    }
`

export const ADD_PET = gql`
    mutation($name: String!,
        $category: String!,
        $desc: String!,
        $text: String!,
        $username: String) {
        addPet(name: $name, category: $category, desc: $desc, text: $text, username: $username,) {
            _id
            name
            category
            desc
            text
            username
        }
    }
`

export const SEARCH_PETS = gql`
    query($searchParam: String) {
        searchPets(searchParam: $searchParam) {
            _id
            name
            desc
            text
            category
            likes
            createdDate
        }
    }
`

