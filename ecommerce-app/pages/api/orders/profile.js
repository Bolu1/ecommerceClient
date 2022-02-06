import nc from "next-connect";
import db from "../../../utils/db";
import Orders from "../../../models/Order";
import { signToken } from "../../../utils/auth";
import { isAuth } from "../../../utils/auth";
import {config} from "../upload"


const handler = nc();
handler.use(isAuth)

handler.put(async (req, res) => {

  await db.connect();
  // console.log(req.body)
  const order = await Orders.findById(req.body.id)
  order.isDelivered = req.body.dev
  order.deliveredAt = Date.now()
  
  await order.save()
  await db.disconnect();

});

export default handler;
