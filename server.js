const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: './variables.env'});
const cors = require('cors')

const Pet = require('./models/Pet');
const User = require('./models/User');

const { ApolloServer, gql } = require('apollo-server-express');

const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('db connected'))
    .catch(err => console.error(err))

const PORT = process.env.PORT || 8000;

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
    context: {
        Pet,
        User
    } 
});
server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`server running on PORT${PORT}`)
})

