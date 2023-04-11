const express = require("express");
const router = express.Router();
const consumerModel = require("../models/consumer_model");
const sellerModel = require("../models/seller_model");
const transactionModel = require("../models/transaction_model");

const {
    addconsumer,
    getAllSellers,
    updateConsumer,
    loginConsumer,
    gauthConsumer
} = require("../controllers/consumer_controller")


async function checkAlreadyConsumer (req, res, next){
    console.log(" checkAlreadyConsumer middleware runnned----------------------");
    const consumerMail = req.body.mail;
    try {
    consumer = await consumerModel.findOne({ mail: consumerMail})
      console.log(consumer, "----------------");
      if (consumer) {
        return res.status(409).json({"msg":" He is Already a seller"})      
      }
      
    } catch (error) {
        res.status(404).json({"msg":error.message})      
    }
    res.consumer = consumer;
    next()
  
  }



router.post("/signin_consumer", checkAlreadyConsumer, addconsumer );

router.post("/login_consumer", loginConsumer);

router.post("/Gauth_consumer", gauthConsumer);

router.get("/getallshops/:id", getAllSellers);


router.patch("/update_consumer/:id", updateConsumer);

module.exports = router;
