import { ApolloServer } from "@apollo/server";
import typeDefs from './typedefs.js'
import resolvers from './resolvers.js'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError:(error) =>{
        return{
            error: error.message
        }
    }
})

export default server;