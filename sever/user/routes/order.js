const express = require("express");
const Jwt = require("jsonwebtoken");
const orderModal = require("../modals/order-modal")

const router = express.Router();

router.get("/",(req,res)=>{
    try{
    //console.log(req.headers,process.env.secertkey)
        const user=Jwt.verify(req.headers.authtoken,process.env.secertkey);
        res.status(200).send(user)
    }catch(err){
        res.status(400).send("User Not Autherized",err.message)
    }

})

router.post("/add",(req,res)=>{
    orderModal.create(req.body).then((userB)=>{
            //console.log(userB)
            res.status(200).json({message:"sucess",orderID:userB._id})
        }).catch((err)=>{
            console.log(err)
            res.status(400).json({message: err.message})
        })
})

router.delete("/cancel/:id",(req,res)=>{
    orderModal.deleteOne({order_id:req.body.params}).then(()=>{
        res.status(200).send("Order cancelled successfully")
    }).catch((err)=>{
        res.status(400).send(err)
    })
})








module.exports= router;