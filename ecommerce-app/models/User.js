import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: { type: String, required: true},
    name: { type: String, required: true},
    password: { type: String, required: true},
    image: { type: String},
    isAdmin: { type: Boolean, required: true, default: false},
},{
    timestamps: true
})

const Users  = mongoose.models.Users || mongoose.model('Users', userSchema)
export default Users