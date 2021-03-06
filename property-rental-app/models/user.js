import mongoose from 'mongoose';
 
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdProperties: [
        {
            type: Schema.Types.ObjectId,
            ref:  'Property'
        }
    ]
})

export default mongoose.model('User', userSchema);