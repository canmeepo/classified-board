const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const createToken = (user, secret, expiresIn) => {

    const { username, email } = user;
    return jwt.sign({username, email }, secret, {expiresIn} )
}

exports.resolvers = {
    Query: {
        getAllPets: async (root, args, {Pet}) => {
            const allPets = await Pet.find().sort({createdDate: 'desc'});
            return allPets;
        },

        getCurrentUser: async (root, args, {currentUser, User}) => {
            if (!currentUser) {
                return null
            }

            const user = await User.findOne({email: currentUser.email})
                .populate({
                    path: 'favorites',
                    model: "Pet"
                })

            return user;
        },

        getUserPosts: async (root, {username}, {Pet}) => {
            const userPosts = await Pet.find({username}).sort({
                createdDate: 'desc'
            });

            return userPosts;
        },

        getPet: async (root, {_id}, {Pet}) => {
            const pet = await Pet.findOne({_id})

            return pet;
        },

        searchPets: async(root, {searchParam}, {Pet}) => {
            if (searchParam) {
                const searchResults = await Pet.find({
                    $text: {$search: searchParam}
                }, {
                    score: {$meta: "textScore"}
                }).sort({
                    score: {$meta: "textScore"}
                })

                return searchResults;
            } else {
                const pets = await Pet.find().sort({createdDate: 'desc'});

                return pets;
            }

        }
    },

    Mutation: {
        addPet: async (root, {name, desc, category, text, username},{ Pet }) => {
            const newPet = await new Pet({
                name, desc, category, text, username
            }).save()

            return newPet
        },

        likePet: async (root, {_id, username}, {Pet, User}) => {
            const pet = await Pet.findOneAndUpdate({_id}, {$inc: {likes: 1}})

            const user = await User.findOneAndUpdate({username}, {$addToSet: {favorites: _id}});

            return pet;
        }, 
        
        unlikePet: async (root, {_id, username}, {Pet, User}) => {
            const pet = await Pet.findOneAndUpdate({_id}, {$inc: {likes: -1}})

            const user = await User.findOneAndUpdate({username}, {$pull: {favorites: _id}});

            return pet;
        },  

        deleteUserPost: async (root, {_id}, {Pet}) => {
            const post = await Pet.findOneAndRemove({_id});

            return post;
        },

        signinUser: async (root, {email, password}, {User}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new Error('User not found')
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                throw new Error('invalid password')
            }

            return { token: createToken(user, process.env.SECRET, '12hr')}

        },
        signupUser: async (root, {username, email, password}, {User}) => {
            const user = await User.findOne({username});

            if(user) {
                throw new Error('User already exist')
            }

            const newUser = new User({
                username,
                email,
                password
            }).save();

            return { token: createToken(newUser, process.env.SECRET, '12hr')}
        }
    }
};