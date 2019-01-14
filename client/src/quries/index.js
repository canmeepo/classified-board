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
