import nc from 'next-connect'
import db from '../../../utils/db'
import Product from "../../../models/product"
import onError from '../../../utils/error'
import {isAdmin} from '../../../utils/auth'

const handler = nc({
    onError
})
handler.use(isAdmin)

handler.post(async (req,res) =>{
        await db.connect()
        const newProduct = new Product({
            ...req.body,
            createdBy: req.user._id
        })
        const order = await newProduct.save()
        res.status(201).send(order)
        db.disconnect
    })


export default handler