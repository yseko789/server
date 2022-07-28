const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type User{
        username: String
        email: String
        password: String
        subscriptions: [Subscription]
        movies: [Int]
    }

    type Subscription{
        providerId: Int
        logo: String
        name: String
        rate: Float
        startDate: String
        endDate: String
        reminderDate: String

    }

    input UserInput{
        username: String
        email: String
        password: String
    }

    type Query{
        getUser(id: ID!): User!
        getMovies(id: ID!): [Int]
        getSubscriptions(id: ID!): [Subscription]

    }

    type Mutation{
        createUser(userInput: UserInput): User!

    }


`;

module.exports = {typeDefs}