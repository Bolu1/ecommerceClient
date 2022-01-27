import nc from "next-connect"
import Product from '../../models/Product'
import db from '../../utils/db'
import data from '../../utils/data'
import Users from  '../../models/User'
import usersData from '../../utils/usersData'

const handler = nc()

handler.get(async (req,res) =>{
    await db.connect()
    await Users.deleteMany()
    await Product.deleteMany()
    console.log(usersData[0].users)
    await Users.insertMany(usersData[0].users)
    await Product.insertMany(data)
    await db.disconnect()
    res.send({message:'seeded successfully'})
})

export default handler

