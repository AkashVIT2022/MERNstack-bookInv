const express = require('express');
const router = express.Router();
// const dealerSchema = require('../model/dealerSchema');
const dealerSchema = require('../dealer_requests');

router.post('/dealer-request',(req,res,next)=>{
    const bookList = req.body;
    dealerSchema.insertMany(bookList,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    })
})


module.exports = router;