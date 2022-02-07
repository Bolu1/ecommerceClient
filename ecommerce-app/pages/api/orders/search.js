import nc from 'next-connect'
import db from '../../../utils/db'
import Products from "../../../models/Product"

const handler = nc()

handler.post(async(req,res) =>{
    
    await db.connect()
    const products = await Order.findById(req.body.search)
    await db.disconnect()
    res.send(products)
})

export default handler