import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getData, getUsers } from "./database.js";
import jwt from 'jsonwebtoken';

let data = getData();
let users = getUsers();

const typeDefs = `#graphql
type AuthPayload {
    token: String!
    username: String!
}

type Data {
    id: ID!
    firstname: String!
    surname: String!
}

type Query {
    getAllData: [Data!]!
    getDatabyId(id: ID!): Data
}

type Mutation {
    addData(
        id: ID!
        firstname: String!
        surname: String!
    ): Data

    login(
        username: String!, 
        password: String!
    ): AuthPayload!
}
`;

const resolvers = {
    Query: {
        getAllData: () => data,
        getDatabyId: (_, args) => {
            const foundData = data.find(p => p.id === args.id);
            if (!foundData) {
                throw new Error('Data not found');
            }
            return foundData;
        }
    },
    Mutation: {
        addData: (_, args) => {
            // Check if record already exists
            if (data.find(b => b.id === args.id)) {
                throw new Error('Record already exists');
            }

            // Create new data object
            const newData = {
                id: args.id,
                firstname: args.firstname,
                surname: args.surname
            };

            // Add to data array (use push instead of concat)
            data.push(newData);
            return newData;
        },
        login: (_, { username, password }) => {
            // Find user
            const user = users.find(
                user => user.username === username && 
                        user.password === password
            );

            // Validate user
            if (!user) {
                throw new Error('Invalid credentials');
            }

            // Generate token
            const token = jwt.sign(
                { username: username }, 
                'my_secret_key',
                { expiresIn: '1d' }
            );

            // Return auth payload
            return {
                token: `Bearer ${token}`,
                username: username
            };
        }
    } 
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => ({
        message: error.message
    })
});

const startServer = async () => {
    try {
        const { url } = await startStandaloneServer(server, {
            listen: { port: 40004 }
        });
        console.log(`🚀 Server ready at: ${url}`);
    } catch (error) {
        console.error('Server startup error:', error);
    }
};

startServer();