import nc from "next-connect";
import db from "../../../utils/db";
import Orders from "../../../models/Order";
import { signToken } from "../../../utils/auth";
import { isAdmin } from "../../../utils/auth";
import {config} from "../upload"


const handler = nc();
handler.use(isAdmin)

handler.put(async (req, res) => {

  await db.connect();
  console.log(req.body)
  const order = await Orders.findById(req.body.orderId)
  order.isDelivered = req.body.dev
  order.deliveredAt = Date.now()
  
  await order.save()
  res.send("Updated")
  await db.disconnect();

});

export default handler;
