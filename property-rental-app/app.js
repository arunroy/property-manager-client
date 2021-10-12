import express, { json } from 'express';
import cors from 'cors';
import graphQLRouter from './routers/graphql-router.js';
import establishDBConnection from './datasources/connect-mongo.js';

const app = express();
app.use(json());
app.use(cors());

app.use('/graphql', graphQLRouter);

try{
   await establishDBConnection();
}
catch(error){
    console.log(error)
};

console.log('MongoDB connection established successfully...');
app.listen(9000);
console.log('App listening on port 9000');



