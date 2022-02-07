import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true},
    highlights: { type: [String], required: true},
    details: { type: String, required: true},
    imageSrc: { type: String, required: true},
    imageAlt: { type: String},
    price: { type: Number, required: true},
    colors: { type: [String], required: true},
    reviews: { type: Object, },
    countInStock: { type: Number, required: true, default: 10},
    sizes: { type: [String], required: true},
    createdBy: { type: String},
   
},{
    timestamps: true
})

const Product  = mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product