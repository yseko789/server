require('dotenv').config()


const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const typeDefs = require('./Schema/TypeDefs')
const resolvers = require('./Schema/Resolvers')
const cors = require('cors')


const connectDB = require('./database/connect')
const app = express()

app.use(cors())

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

async function startServer(){
    const apolloServer = new ApolloServer({
        typeDefs, 
        resolvers,
        introspection: true,
        playground: true,
        cors: corsOptions
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app})

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