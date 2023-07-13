const express = require('express');
const router = express.Router();
// const dealer_InvSchema = require('../model/dealer_InvSchema');
const dealer_InvSchema = require('../admin_inventorys');

router.get('/api-get',(req,res,next)=>{
    dealer_InvSchema.find((error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    })
})

module.exports = router;