const { renameSync } = require('fs')
const Movie = require('../models/Movie')
const Subscription = require('../models/Subscription')
const User = require('../models/User')

const resolvers = {
    Query:{

        async login(_,{loginUser:{email, password}}){
            
            if(!email){
                throw new Error('Email is required.')
            }
            if(!password){
                throw new Error('Password is required.')
            }
            const user = await User.findOne({email})
            if(!user){
                throw new Error('Wrong email.')
            }
            if(await user.comparePassword(password)){
                const token = user.createJWT()
                return {user, token}
            }else{
                throw new Error('Wrong password.')
            }
        },

        async getUser(_,{userId}){
            return await User.findById(userId)
        },

        async getMovies(_,{userId}){
            return await User.findById(userId, 'movies')
        },
        async getSubscriptions(_,{userId}){
            const subscriptionsIds = await User.findById(userId, 'subscriptions')
            const subscriptions = await Subscription.find().where('_id').in(subscriptionsIds.subscriptions)
            return subscriptions
        }
    },

    Mutation:{
        createUser: async(parent, args, context, info) =>{
            const {username, email, password} = args.userInput
            const user =  await User.create({
                username,
                email,
                password,
                subscriptions: [],
                movies: []
            })
            const token = user.createJWT()
            return {user, token}
        },
        editUser: async(parent, {userId, userInput}, context, info)=>{
            const user = await User.findByIdAndUpdate(
                userId,
                userInput,
                {new: true, runValidators: true}
            )
            if(!user){
                throw new Error('User does not exist.')
            }
            return user
        },
        createSubscription: async(parent, {userId, subscription}, context, info) =>{
            const sub = await Subscription.create(subscription)
            const user = await User.findByIdAndUpdate(
                userId, 
                {$push:{"subscriptions":sub}},
                {new:true}
            )
            if(!user){
                throw new Error('User does not exist.')
            }
            return sub

        },
        addMovie: async(parent, {userId,movieId}, context, info)=>{
            const user = await User.findByIdAndUpdate(
                userId,
                {$push: {"movies": movieId}},
                {new: true}
            )
            if(!user){
                throw new Error('User does not exist.')
            }
            return user
        }
    }
}

module.exports = resolvers