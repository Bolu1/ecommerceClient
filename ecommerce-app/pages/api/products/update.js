import nc from "next-connect";
import db from "../../../utils/db";
import Products from "../../../models/Product";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";
import { isAdmin } from "../../../utils/auth";
import {config} from "../upload"


const handler = nc();
handler.use(isAdmin)

handler.put(async (req, res) => {

  await db.connect();
  const product = await Products.findById(req.body.id)
  product.name = req.body.name
  product.price = req.body.price
  product.category = req.body.category
  product.colors = req.body.colors
  product.sizes = req.body.sizes
  product.countInStock = req.body.countInStock
  product.highlight = req.body.highlight
  product.details = req.body.details
  product.description = req.body.description
  product.imageSrc = req.body.imageSrc.base64?req.body.imageSrc.base64: product.imageSrc
  await product.save()
  await db.disconnect();
  // res.send("Product Updated");
  res.status(200).send("Product updated")
});

export default handler;
