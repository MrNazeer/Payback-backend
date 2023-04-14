const express = require("express");
const router = express.Router();
const transactionModel = require("../models/transaction_model");
const sellerModel = require("../models/seller_model");
const consumerModel = require("../models/consumer_model");
const {
    addseller,
    detailsOfSeller,
    updateSeller,
    addConsumerInSeller,
    removeConsumer,
    loginSeller,
    upadteLimit
} = require("../controllers/seller_controller")

async function checkAlreadyConsumer (req, res, next){
    console.log(" checkAlreadyConsumer middleware runnned----------------------",req.params.id,req.body.ConsumerId);
    const sellerId = req.params.id;
    const consumerId = req.body.ConsumerId;

    try {
    consumer = await sellerModel.findOne({ _id: sellerId , "Consumers.ConsumerId": consumerId })
      console.log("He is Already a Consumer ----------------");
      if (consumer) {
        return res.status(409).json({"msg":" He is Already a Consumer",consumer})      
      }
      
    } catch (error) {
  
      res.status(404).json({"msg":error.message})      
    }
    res.consumer = consumer;
    next()

}


async function checkAlreadySeller (req, res, next){
  console.log(" checkAlreadyConsumer middleware runnned----------------------");
  const sellerMail = req.body.gmail;
  try {
  seller = await sellerModel.findOne({ gmail: sellerMail})
    console.log(seller, "----------------");
    if (seller) {
      return res.status(409).json({"msg":" He is Already a seller"})      
    }
    
  } catch (error) {

    res.status(404).json({"msg":error.message})      
  }
  res.seller = seller;
  next()

}




router.post("/signin_seller", checkAlreadySeller,addseller);

router.post("/login_seller", loginSeller);

router.get("/detailsOfSeller/:id", detailsOfSeller);

router.patch("/updateSeller/:id", updateSeller);

router.patch("/add_cosnumer/:id", checkAlreadyConsumer, addConsumerInSeller);

router.patch("/del_consumer/:id", removeConsumer);

router.patch("/UpdateLimit/:id",upadteLimit );


module.exports = router;
