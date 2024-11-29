import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getData,getUsers } from "./database";

let data = getData();

const typeDefs =`
    type Data {
        id: ID!
        firstname: String!
        Surname: String!

    }
    type Query {
        getAllData(): [Data!]!
    }
`

const resolvers = {
    query : {
        getAllData: () => data
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url}= qwait startStandaloneServer(server,{
    listen: {port:4000}
});

console.log(`Server ready at:` ${url})