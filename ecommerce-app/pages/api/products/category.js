import nc from 'next-connect'
import db from '../../../utils/db'
import Product from "../../../models/Product"

const handler = nc()

handler.post(async(req,res) =>{
    await db.connect()
    console.log(req.body.state, req.body.search)
    const products = await Product.find({ name : { "$regex": req.body.search, "$options": "i"} , category: req.body.state })
    await db.disconnect()
    console.log(products)
    res.send(products)
})

export default handler