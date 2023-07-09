const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const { ObjectId } = require('mongodb');
const bodyParser =require('body-parser');
const app=express();
app.use(cors());
app.use(express.json());

let details=require('./details');
let publisher_shipments=require('./publisher_shipments');
let dealer_requests=require('./dealer_requests');
let publisher_inventorys=require('./publisher_inventorys');
let dealer_inventorys=require('./dealer_inventorys');

let publisher_InvRoute=require('./controller/publisher_InvRoute');
let dealer_InvRoute = require("./controller/dealer_InvRoute");
let publisherRoute = require("./controller/publisherRoute")
let dealerRoute = require("./controller/dealerRoute")
mongoose.connect("mongodb+srv://dip9381:147258369@cluster0.y6j8ueh.mongodb.net/login", {
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

app.get('/details', async(req,res)=>{
  const {id,pass}=req.query;
  //console.log(id,pass);
    details.find({id:id,password:pass})
    .then((result)=>{
        //console.log(result);
       // res.json(result);
        if(result.length==0)
        res.json('not found')
        else
        res.json('found');
    })
    .catch((err)=>console.log(err));
})
app.get('/pub_details', async(req,res)=>{
  const {id,pass}=req.query;
  // console.log(id,pass);
    details.find({pub_id:id,password:pass})
    .then((result)=>{
        // console.log(result);
      //  res.json(result);
        if(result.length==0)
        res.json('not found')
        else
        res.json('found');
    })
    .catch((err)=>console.log(err));
})
app.get('/dealer_details', async(req,res)=>{
  const {id,pass}=req.query;
  // console.log(id,pass);
    details.find({dealer_id:id,password:pass})
    .then((result)=>{
        // console.log(result);
      //  res.json(result);
        if(result.length==0)
        res.json('not found')
        else
        res.json('found');
    })
    .catch((err)=>console.log(err));
})

app.get('/publisher_shipment',async(req,res)=>{
  publisher_shipments.find({})
  .then((result)=>{
   // console.log(result);
    res.json(result);
  })
  .catch((err)=>console.log(err));
})
app.get('/dealer_request',async(req,res)=>{
  dealer_requests.find({})
  .then((result)=>{
  //  console.log(result);
    res.json(result);
  })
  .catch((err)=>console.log(err));
})
app.post('/update_shipment_status',async(req,res)=>{
  console.log(req.body);
  let id=req.body.id;
  let stat=req.body.stat;
  publisher_shipments.findOneAndUpdate({_id:new ObjectId(id)},{$set:{stat:stat}},{returnOriginal:false})
  .then((result)=>{
    // console.log(result);
    if(result.stat=='accepted'){
      result.books.map((val)=>{
        publisher_inventorys.findOneAndUpdate({name:val.name},{$inc:{quantity:-val.quantity}},{returnOriginal:false})
        .then((response)=>console.log(response))
        .catch((err)=>console.log(err));
      })
    }
  })
  .catch((err)=>console.log(err));
})
app.post('/update_dealer_status',async(req,res)=>{
  console.log(req.body);
  let id=req.body.id;
  let stat=req.body.stat;
  dealer_requests.findOneAndUpdate({_id:new ObjectId(id)},{$set:{stat:stat}},{returnOriginal:false})
  .then((result)=>{
    // console.log(result);
    if(result.stat=='accepted'){
      result.books.map((val)=>{
        dealer_inventorys.findOneAndUpdate({name:val.name},{$inc:{quantity:+val.quantity}},{returnOriginal:false})
        .then((response)=>console.log(response))
        .catch((err)=>console.log(err));
      })
    }
  })
  .catch((err)=>console.log(err));
})


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/pub_inv',publisher_InvRoute);
app.use('/deal_inv',dealer_InvRoute);
app.use("/publish",publisherRoute);
app.use("/deal",dealerRoute);


app.listen(3001,()=>{
    console.log('server running at 3001');
})