import request from "request";
import nc from "next-connect";
import Orders from "../../../models/Order";
import { isAuth } from "../../../utils/auth";
const { initializePayment, verifyPayment } = require("../../../utils/paystack")(
  request
);
import db from "../../../utils/db";

const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {  const ref = req.body.reference;
  const orderId = req.body.id;
  // res.send(ref)
  verifyPayment(ref, async(error, body) => {
    if (error) {
      //handle errors appropriately
      console.log(error);
      console.log("coul error");
      return res.status(500).json({ json: error });
    }
    const response = JSON.parse(body);
    const data = response.data;

    await db.connect();
    const order = await Orders.findById(req.body.id);
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();
    await db.disconnect();
  });
  res.send("done");
})

export default handler;
