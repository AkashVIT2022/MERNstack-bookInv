const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const { ObjectId } = require('mongodb');
const bodyParser =require('body-parser');
const app=express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

let stockRoutes=require('./routes/stocks')
let dealerroutes=require('./routes/dealer')
let publisherroutes=require('./routes/publisher')

let details=require('./details');
let publisher_shipments=require('./publisher_shipments');
let dealer_requests=require('./dealer_requests');
let publisher_inventorys=require('./publisher_inventorys');
let dealer_inventorys=require('./dealer_inventorys');
let admin_inventorys=require('./admin_inventorys');

let publisher_InvRoute=require('./controller/publisher_InvRoute');
let dealer_InvRoute = require("./controller/dealer_InvRoute");
let publisherRoute = require("./controller/publisherRoute")
let dealerRoute = require("./controller/dealerRoute")

let dealRoutes = require('./routes/dealers');
let  PubRoutes= require('./routes/pubs');
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
      const {id}=req.query;
      console.log(id);
      if(id!=undefined && id.length==0){
        publisher_shipments.find({})
      .then((result)=>{
        console.log(result);
        res.json(result);
      })
      .catch((err)=>console.log(err));
      }
      else{
        publisher_shipments.find({pub_name:id})
        .then((result)=>{
          console.log(result);
          res.json(result);
        })
        .catch((err)=>console.log(err));
      }
    })
    app.get('/dealer_request',async(req,res)=>{
      const {id}=req.query;
      if(id!=undefined && id.length==0){
        console.log(req.query);
      dealer_requests.find({})
      .then((result)=>{
   console.log(result);
    res.json(result);
  })
  .catch((err)=>console.log(err));
      }
      else{
        console.log(req.query);
        dealer_requests.find({dealer_name:id})
        .then((result)=>{
     console.log(result);
      res.json(result);
    })
    .catch((err)=>console.log(err));
      }
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
        .then((response)=>{
          console.log(response);
          admin_inventorys.findOneAndUpdate({name:val.name},{$inc:{quantity:+val.quantity},$set:{price:val.price}},{returnOriginal:false})
          .then((response)=>console.log(response,'//'))
          .catch((err)=>console.log(err));
        })
        .catch((err)=>console.log(err));
        console.log(val);
        
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
        dealer_inventorys.findOneAndUpdate({name:val.name,dealer_name:result.dealer_name},{$inc:{quantity:+val.quantity}},{returnOriginal:false})
        .then((response)=>{
          console.log(response,'working')
          if(response==null){
            dealer_inventorys.insertMany({name:val.name,dealer_name:result.dealer_name,quantity:val.quantity})
            .then((a)=>console.log(a))
            .catch((er)=>console.log(err))
          }
        })
        .catch((err)=>console.log(err));
        
        admin_inventorys.findOneAndUpdate({dealer_name:id,name:val.name},{$inc:{quantity:-val.quantity},$set:{price:val.price}},{returnOriginal:false})
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

app.use('/api/stocks',stockRoutes)
app.use('/api/dealer',dealerroutes)
app.use('/api/publisher',publisherroutes)

app.use('/api/pubs',PubRoutes)
app.use('/api/deals',dealRoutes)  

app.listen(3001,()=>{
    console.log('server running at 3001');
})