import nc from 'next-connect'
import db from '../../../utils/db'
import Product from "../../../models/Product"
import request from 'request'
const {initializePayment, verifyPayment} = require('../../../utils/paystack')(request);

async function payStackPay(req, res) {
    const form = {
        amount: req.body.totalPrice,
        email: "sss@gmail.com",
    }
    
    
    form.amount *= 100;
    
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return res.status(500).json({error:error})
            // return; 
        }
        const response = JSON.parse(body);
        res.status(200).json({url:response.data.authorization_url})
    });
}

export default payStackPay;