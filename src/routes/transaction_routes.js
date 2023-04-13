const express = require("express");
const router = express.Router();
const transactionModel = require("../models/transaction_model");
const sellerModel = require("../models/seller_model");
const consumerModel = require("../models/consumer_model");

const {
    addTransation,
    getOverallSellerTransaction,
    getOverallConsumerTransaction,
    getIndiConsumerTransaction,
    delATransaction,
    delAllTransaction
} = require("../controllers/transaction_controller")


async function checkHeisConsumer(req, res, next) {
    console.log("middleware runnned----------------------");
    const sellerId = req.body.sellerId;
    const consumerId = req.body.consumerId;

    try {
      seller = await consumerModel.findOne({ _id: consumerId , 'sellers.sellerId': sellerId })
      console.log(seller, "----------------");
      if (seller == null) {
        return res.status(404).json({"msg":" He is not your seller"})      
      }
      
    } catch (error) {
  
      res.status(404).json({"msg":error.message})      
    }
    
    res.seller = seller;
    next()
  
  }




router.get("/get_overAllTrans_seller/:id", getOverallSellerTransaction);

router.get("/get_overAllTrans_consumer/:id", getOverallConsumerTransaction );

router.get("/get_IndividualTrans_consumer/", getIndiConsumerTransaction );

router.post("/add_transaction/", checkHeisConsumer ,addTransation);

router.delete("/del_transaction/", delATransaction);

router.delete("/del_allTransaction/",delAllTransaction);



module.exports = router;

