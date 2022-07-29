const { renameSync } = require('fs')
const Movie = require('../models/Movie')
const Subscription = require('../models/Subscription')
const User = require('../models/User')

const resolvers = {
    Query:{
        hello: ()=> "hello",

        async getUser(_,{id}){
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
        createUser: async(parent, args, context, info) =>{
            const {username, email, password} = args.userInput
            const newUser =  await User.create({
                username,
                email,
                password,
                subscriptions: [],
                movies: []
            })
            return newUser
        },
        createSubscription: async(parent, {userId, subscription}, context, info) =>{
            const sub = await Subscription.create(subscription)
            const user = await User.findByIdAndUpdate(
                userId, 
                {$push:{"subscriptions":sub}},
                {new:true}
            )
            return sub

        },
        addMovie: async(parent, {userId,movieId}, context, info)=>{
            const user = await User.findByIdAndUpdate(
                userId,
                {$push: {"movies": movieId}},
                {new: true}
            )
            return user
        }
    }
}

module.exports = resolvers