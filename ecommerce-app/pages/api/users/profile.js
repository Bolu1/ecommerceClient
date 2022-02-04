import nc from "next-connect";
import db from "../../../utils/db";
import Users from "../../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";
import { isAuth } from "../../../utils/auth";
import {config} from "../upload"


const handler = nc();
handler.use(isAuth)

handler.put(async (req, res) => {

  await db.connect();
  // console.log(req.body)
  const user = await Users.findById(req.user._id)
  user.name = req.body.name
  user.email = req.body.email
  console.log(user.password)
  user.password = req.body.password?bcrypt.hashSync(req.body.password): user.password
  user.image = req.body.image?req.body.image.base64: user.image
  await user.save()
  await db.disconnect();

    const token = signToken(user);
    res.send({
      image: user.image,
      data:{
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }});
});

export default handler;
