import nc from 'next-connect'
import db from '../../../utils/db'
import Product from "../../../models/Product"

const handler = nc()

handler.post(async(req,res) =>{
    await db.connect()
    const products = await Product.find({ name : { "$regex": req.body.search, "$options": "i" }})
    await db.disconnect()
    res.send(products)
})

export default handler