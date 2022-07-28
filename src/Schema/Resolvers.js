const Movie = require('../models/Movie')
const Subscription = require('../models/Subscription')
const User = require('../models/User')

const resolvers = {
    Query:{
        async getUser(_,{id}){
            // do mongodb find function and return
            return await User.findById(id)
        },

        async getMovies(_,{id}){
            return await User.findById(id, 'movies')
        },
        async getSubscriptions(_,{id}){
            return await User.findById(id, 'subscriptions')
        }
    },

    Mutation:{
        async createUser(_, {userInput: {username, email, password}}){
            console.log('hello')
            const newUser =  new User({
                username: username,
                email: email,
                password: password,
                subscriptions: [],
                movies: []
            })
            const res = await newUser.save()
            
            return{
                id: res.id,
                ...res._doc
            }
        }
    }
}

module.exports = resolvers