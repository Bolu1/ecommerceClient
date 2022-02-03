import nc from 'next-connect'
import db from '../../../utils/db'
import Product from "../../../models/Product"

const handler = nc()

handler.post(async(req,res) =>{
    const PAGE_SIZE = 1
    const page = parseInt(req.query.page || "0")
    await db.connect()
    console.log(req.body.state, req.body.search)
    const products = await Product.find({ name : { "$regex": req.body.search, "$options": "i"} , category: req.body.state|| req.body.category })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page)
    await db.disconnect()
    res.send(products)
})

export default handler