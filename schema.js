exports.typeDefs = `

type Pet {
    _id: ID
    name: String!
    category: String!
    desc: String!
    text: String!
    createdDate: String
    likes: Int
    username: String
}

type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    createdDate: String
    favorites: [Pet]
}

type Query {
    getAllPets: [Pet]
    getPet(_id: ID!): Pet
    searchPets(searchParam: String): [Pet]

    getCurrentUser: User

}

type Token {
    token: String!
}

type Mutation {
    addPet(
        name: String!
        category: String!
        desc: String!
        text: String!
        username: String
    ): Pet

    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(email: String!, password: String!): Token
}
`;