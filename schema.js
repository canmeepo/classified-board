exports.typeDefs = `

type Pet {
    _id: ID
    name: String!
    category: String!
    imageUrl: String!
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
    getUserPosts(username: String!): [Pet]

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
        imageUrl: String!
    ): Pet
    deleteUserPost(_id: ID): Pet

    updateUserPost(
        _id: ID, 
        name: String!
        category: String!
        desc: String!
        text: String!
        username: String
        imageUrl: String!): Pet

    likePet(_id: ID!, username: String!): Pet
    unlikePet(_id: ID!, username: String!): Pet

    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(email: String!, password: String!): Token
}
`;