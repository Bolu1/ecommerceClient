import nc from 'next-connect'
import db from '../../../utils/db'
import Product from "../../../models/Product"

const handler = nc()

handler.get(async(req,res) =>{
    await db.connect()
    console.log("idddd"+ req.query.id)
    const products = await Product.findById(req.query.id)
    await db.disconnect()
    res.send(products)
})

export default handler