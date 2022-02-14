import request from 'request'
const {initializePayment, verifyPayment} = require('../../../utils/paystack')(request);

async function payStackCallback(req, res) {
    const ref = req.body.reference;
    const orderId = req.body.orderId
    // res.send(ref)
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            console.log("coul error")
            return res.status(500).json({json:error});
        }
        const response = JSON.parse(body);        

        const data = response.data
        console.log(data)

        
    })
    res.send("done")
}

export default payStackCallback;