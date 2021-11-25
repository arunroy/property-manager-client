import express from 'express';
import bcrypt from 'bcryptjs';
import { graphqlHTTP } from 'express-graphql';
import User from '../models/user.js';
import Property from '../models/property.js';
import appSchema from '../schemas/index.js';

const router = express.Router();

router.post('/', graphqlHTTP({
    schema: appSchema,
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

export default router;