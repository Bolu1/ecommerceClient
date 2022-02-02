import nc from "next-connect";
import db from "../../../utils/db";
import Users from "../../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";


const handler = nc();

handler.post(async (req, res) => {

  await db.connect();
  const data = await Users.findOne({ email: req.body.email })
  if(data){
    console.log(data)
    res.status(200).send("This email is already in use")
  }else{
  const user = new Users({name: req.body.name, 
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password),
                        isAdmin: false                        
  })
  const createdUser = await user.save()
    await db.disconnect();
      const token = signToken(createdUser);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
});

export default handler;
