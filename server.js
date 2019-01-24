const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: './variables.env'});
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Pet = require('./models/Pet');
const User = require('./models/User');
const path = require('path');

const { ApolloServer, gql } = require('apollo-server-express');

const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');
const {verifyToken} = require("./utils/token");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('db connected'))
    .catch(err => console.error(err))

const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: async ({req}) => ({
        Pet,
        User,
        currentUser: await verifyToken(req)
    })
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`server running on PORT${PORT}`)
})

