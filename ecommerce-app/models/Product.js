import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true},
    highlights: { type: [String], required: true},
    details: { type: String, required: true},
    imageSrc: { type: String, required: true},
    imageAlt: { type: String, required: true},
    price: { type: Number, required: true},
    colors: { type: [Object], required: true},
    reviews: { type: Object, required: true, },
    countInStock: { type: Number, required: true, default: 10},
    sizes: { type: [Object], required: true},
},{
    timestamps: true
})

const Product  = mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product