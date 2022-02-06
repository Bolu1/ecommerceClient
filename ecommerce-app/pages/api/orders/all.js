import nc from 'next-connect'
import db from '../../../utils/db'
import Order from "../../../models/Order"
import onError from '../../../utils/error'
import {isAuth} from '../../../utils/auth'

const handler = nc({
    onError
})
handler.use(isAuth)

handler.get(async (req,res) =>{
        await db.connect()
        const orders = await Order.find()
        res.send(orders)
        db.disconnect
    })


export default handler