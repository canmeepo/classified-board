const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const createToken = (user, secret, expiresIn) => {

    const { username, email } = user;
    return jwt.sign({username, email }, secret, {expiresIn} )
}

exports.resolvers = {
    Query: {
        getAllPets: async (root, args, {Pet}) => {
            const allPets = await Pet.find();
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
        }
    },

    Mutation: {
        addPet: async (root, {name, desc, category, text, username},{ Pet }) => {
            const newPet = await new Pet({
                name, desc, category, text, username
            }).save()

            return newPet
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