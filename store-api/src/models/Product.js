import {model, Schema} from 'mongoose'

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    imgURL: String
}, {
    timestamps: true,
    versionKey: false
})

export default model('Products', productSchema);