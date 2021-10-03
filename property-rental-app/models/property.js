import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const propertySchema = new Schema({
    address: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    datePosted: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Property', propertySchema);

