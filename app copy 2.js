import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getData, getUsers } from "./database.js";

let data = getData();

// Define schema
const typeDefs = `
    type Data {
        id: ID!
        firstname: String!
        surname: String!
    }

    type Query {
        getAllData: [Data!]!
    }
`;

// Define resolvers
const resolvers = {
    query : {
        getAllData: () => data
    }
}

// Create Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Start the server
const startServer = async () => {
    try {
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 }
        });
        console.log(`🚀 Server ready at: ${url}`);
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

// startServer();