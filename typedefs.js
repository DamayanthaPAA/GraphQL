const typeDefs = `#graphql
"""Authorization record for user authentication"""
type User {
    username: String!
    password: String!
    token: String!
    userOwnData: [Data!]!
}

type AuthPayload {
    """Bearer token of authorized user"""
    token: String!
    """Username of the token owner"""
    username: String!
}

"""Data record representing user information"""
type Data {
    """Unique identifier for the data record"""
    id: ID!
    """User's first name"""
    firstname: String!
    """User's surname"""
    surname: String!
}

type Query {
    """API call for returning all data records"""
    getAllData: [Data!]!
    
    """Retrieve a specific data record by its ID"""
    getDatabyId(id: ID!): Data
    getUserData(username: String!): [Data!]
    "Return data records based on ?"
    getUsers:[User!]!
}

type Mutation {
    """Add a new data record"""
    addData(
        """Unique identifier for the new record"""
        id: ID!
        """First name of the user"""
        firstname: String!
        """Surname of the user"""
        surname: String!
    ): Data

    """User login mutation"""
    login(
        """Username for login"""
        username: String!, 
        """Password for authentication"""
        password: String!
    ): AuthPayload!
}
`;

export default typeDefs;