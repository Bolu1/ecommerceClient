import nc from 'next-connect'
import db from '../../../utils/db'
import Order from "../../../models/Order"
import {isAuth} from '../../../utils/auth'

const handler = nc()
handler.use(isAuth)
handler.get(async(req,res) =>{
    await db.connect()
    const products = await Order.findById(req.query.id)
    await db.disconnect()
    res.send(products)
})

export default handler