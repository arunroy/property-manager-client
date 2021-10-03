import express, { json } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';
import Property from './models/property.js';
import User from './models/user.js';
import bcrypt from 'bcryptjs';

const app = express();
app.use(json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`

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
    `),
    rootValue: {
        properties: () => {
            return Property
                    .find()
                    .then( properties => {
                        return properties.map(property => {
                            return { ...property._doc, _id: property.id };
                        })
                    })

        },
        createProperty: args => {
            const property = new Property({
                address: args.propertyInput.address,
                description: args.propertyInput.description,
                price: +args.propertyInput.price,
                datePosted: new Date(args.propertyInput.datePosted),
                creator: '614cfca6cc13dade92ef07a9'
            });
            let createdProperty;

            return property
                .save()
                .then(result => { 
                    createdProperty = { ...result._doc, id: result._doc._id.toString() };
                    return User.findById('614cfca6cc13dade92ef07a9');
                })
                .then(user => {
                    if(!user) {
                        throw new Error('User not found');
                    }
                    user.createdProperties.push(property);
                    return user.save();
                })
                .then(result => {
                    return createdProperty;
                })
                .catch(error => {
                    throw error
                });
        },
        createUser: args => {
            return User
                .findOne({ email: args.userInput.email})
                .then(user => {
                    if(user) {
                        throw new Error('User exists');
                    }
                    return bcrypt
                    .hash(args.userInput.password, 12)
                })
                .then(hashedPassword => {                
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPassword
                    });
                    return user.save();
                })
                .then(result => {
                    return { ...result._doc, password: null, id: result.id }
                })
                .catch(error => { 
                    throw error
                })
        }
    },
    graphiql: true
}));

mongoose
    .connect(`mongodb+srv://${
                process.env.DB_USER
            }:${process.env.DB_PASSWORD
            }@cluster0.fmw4u.gcp.mongodb.net/${
                process.env.DB_NAME
            }?retryWrites=true&w=majority`)
    .then(() => {
        console.log('MongoDB connection established successfully...');
        app.listen(9000);
        console.log('App listening on port 9000');
    })
    .catch(error => console.log(error));



