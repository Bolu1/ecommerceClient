import nc from "next-connect";
import db from "../../../utils/db";
import Users from "../../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";


const handler = nc();

handler.post(async (req, res) => {

  await db.connect();
  const user = await Users.findOne({ email: req.body.email });
  await db.disconnect();
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
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
  } else {
    res.status(401).send({ error: "invalid login params" });
  }
});

export default handler;
