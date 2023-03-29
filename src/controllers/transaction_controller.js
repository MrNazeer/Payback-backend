const { ObjectID } = require("bson");
const transactionModel = require("../models/transaction_model");
const sellerModel = require("../models/seller_model");
const consumerModel = require("../models/consumer_model");

//add a transactoion

const addTransation = async (req, res) => {
    console.log(req.body);
    const transaction = new transactionModel(req.body);
  
    try {
      await transaction.save();
      res.send(transaction);
    } catch (error) {
      res.status(500).send(error);
    }
  };

//get Over all Seller Transaction

  const getOverallSellerTransaction = async (req, res) => {
        console.log("Called......")
    try {
      const data = await transactionModel.find({"sellerId" : req.params.id})
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


  // get Over all Consumer Transaction

  const getOverallConsumerTransaction = async (req, res) => {
    console.log("Called......")
try {
  const data = await transactionModel.find({"consumerId" : req.params.id})
  res.status(200).json(data);
} catch (error) {
  res.status(500).json({
    message: error.message,
  });
}
};


//get_IndiConsumerTransaction

const getIndiConsumerTransaction = async (req, res) => {
    console.log("Called......")
try {
  const data = await transactionModel.find({"consumerId" : req.body.consumerId, "sellerId" : req.body.sellerId})
  res.status(200).json(data);
} catch (error) {
  res.status(500).json({
    message: error.message,
  });
}
};





//Del a Transaction using transaction ID


const delATransaction =  async (req,res) =>{

  console.log("Called............");

  
  try {
    await transactionModel.findOneAndDelete(req.params.id)
    res.status(200).json({"msg":`Deleted ${res.id} Successfully`})
    
  } catch (error) {
    res.send(error)
  }

}



//Del all Transaction using seller ID and Consumer ID.


const delAllTransaction =  async (req,res) =>{

  console.log("Called............");

  
  try {
    await transactionModel.deleteMany({"consumerId" : req.body.consumerId, "sellerId" : req.body.sellerId})
    res.status(200).json({"msg":`Deleted Successfully`})
  } catch (error) {
    res.send(error)
  }

}







  module.exports.addTransation = addTransation;
  module.exports.getOverallSellerTransaction = getOverallSellerTransaction;
  module.exports.getOverallConsumerTransaction = getOverallConsumerTransaction;
  module.exports.getIndiConsumerTransaction = getIndiConsumerTransaction;
  module.exports.delATransaction = delATransaction;
  module.exports.delAllTransaction = delAllTransaction;