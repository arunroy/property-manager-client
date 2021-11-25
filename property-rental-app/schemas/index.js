import { buildSchema } from 'graphql';

const appSchema = buildSchema(`

        type Property {
            _id: ID!
            address: String!
            description: String!
            price:  Float!
            datePosted: String!
            creator: User!
        }

        input PropertyInput {
            address: String!
            description: String!
            price:  Float!
            datePosted: String!
        }

        type User {
            _id: ID!,
            email: String!,
            password: String,
            createdProperties: [Property!]
        }

        input UserInput {
            email: String!, 
            password: String!
        }

        type RootQuery {
            properties: [Property!]!
        }

        type RootMutation {
            createProperty(propertyInput: PropertyInput): Property
            createUser( userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation 
        }
    `);

    export default appSchema;