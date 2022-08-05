const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        password: String
        subscriptions: [Subscription]
        movies: [ID]
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

    type LoginResponse{
        user: User,
        token: String
    }

    input UserInput{
        username: String
        email: String
        password: String
    }

    input LoginUser{
        email: String,
        password: String
    }

    input SubscriptionInput{
        providerId: Int
        logo: String
        name: String
        rate: Float
        startDate: String
        endDate: String
        reminderDate: String
    }

    


    type Query{
        login(loginUser: LoginUser): LoginResponse
        getUser(userId: ID!): User
        getMovies(userId: ID!): [ID]
        getSubscriptions(userId: ID!): [Subscription]
        hello: String!

    }

    type Mutation{
        createUser(userInput: UserInput): LoginResponse
        editUser(userId: ID, userInput: UserInput): User
        createSubscription(userId: ID, subscription: SubscriptionInput): Subscription
        addMovie(userId: ID, movieId: ID): User
    }


`;

module.exports = typeDefs