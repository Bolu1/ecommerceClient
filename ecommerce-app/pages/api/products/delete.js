import nc from 'next-connect'
import db from '../../../utils/db'
import Product from "../../../models/Product"

const handler = nc()

handler.post(async(req,res) =>{
    await db.connect()
    console.log("idddd"+ req.body.id)
    const products = await Product.findByIdAndRemove(req.body.id)
    console.log(products)
    await db.disconnect()
    res.send(products)
})

export default handler