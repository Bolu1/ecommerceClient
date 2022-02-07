import nc from 'next-connect'
import db from '../../../utils/db'
import Product from "../../../models/Product"

const handler = nc()

handler.post(async(req,res) =>{
    const PAGE_SIZE = 10
    const page = parseInt(req.query.page || "0")
    await db.connect()
    const products = await Product.find({ name : { "$regex": req.body.search, "$options": "i" }})
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page)
    await db.disconnect()
    res.send(products)
})

export default handler