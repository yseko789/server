require('dotenv').config()


const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const {typeDefs} = require('./Schema/TypeDefs')
const {resolvers} = require('./Schema/Resolvers')

const app = express()

const connectDB = require('./database/connect')

async function startServer(){
    const server = new ApolloServer({
        typeDefs, 
        resolvers,
        introspection: true,
        playground: true
    })
    await server.start()
    server.applyMiddleware({app})

}

app.get('/', (req,res)=>{
    res.send('hello')
})



const port = 3001

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log('Server listening...')
        })
    }catch(error){
        console.log(error)
    }
}

startServer()
start()