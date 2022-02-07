import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    orderItems: { type: [Object], required: true},
    shippingAddress:{type: Object, required: true},
    paymentMethod: {type: String, required: true},
    itemsPrice: {type: Number, required: true},
    shippingPrice: {type: Number, required: true},
    taxPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    isPaid: {type: Boolean, required: true, default: false},
    isDelivered: {type: Boolean, required: true, default: false},
    paidAt: {type: Date},
    deliveredAt: {type: Date}
},{
    timestamps: true
})

const Order  = mongoose.models.Order || mongoose.model('Order', orderSchema)
export default Order