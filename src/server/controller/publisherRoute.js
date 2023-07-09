const express = require('express');
const router = express.Router();
// const publisherSchema = require('../model/publisherSchema');
const publisherSchema = require('../publisher_shipments');

router.post('/publish-request',(req,res,next)=>{
    const bookList = req.body;
    publisherSchema.insertMany(bookList,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    })
})


module.exports = router;