const express = require('express');
const router = express.Router();
// const publisher_InvSchema = require('../model/publisher_InvSchema');
const publisher_InvSchema = require('../publisher_inventorys');

router.get('/api-get',(req,res,next)=>{
    console.log('working');
    publisher_InvSchema.find((error,data)=>{
        if(error){
            return next(error);
        }else{
            // console.log(data);
            res.json(data);
        }
    })
})

module.exports = router;