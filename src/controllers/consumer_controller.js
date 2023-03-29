const { ObjectID } = require("bson");
const consumerModel = require("../models/consumer_model");
const sellerModel = require("../models/seller_model");
const transactionModel = require("../models/transaction_model");

// Add Consumer

const addconsumer = async (req, res) => {
    console.log(req.body);
    const consumer = new consumerModel(req.body);
  
    try {
      await consumer.save();
      res.send(consumer);
    } catch (error) {
      res.status(500).send(error);
    }
  };


// get user details including shops name using Objectid.


  const getAllSellers = async (req, res) => {
    console.log("called..................");
  try {
    const data = await consumerModel.findById(req.params.id);
    res.json(data)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




//Update consumer Data Using ObjectID.

const updateConsumer = async (req, res) =>{

  console.log("called..................");

  if (!req.body) {
    return res.status(400).json({"msg":"Data cant be empty"})    
  }
  const id = req.params.id;

  consumerModel.findByIdAndUpdate(id, req.body)
    .then(data => {
      console.log(data,"++++++++++++++");
      if (!data) {
        res.status(404).send({
          message: `Cannot update  with id=${id}. Maybe id was not found!`
        });
      } else res.send({ message: "id was updated successfully.",data:data });
    })

    .catch(err => {
      res.status(500).send({
        message: "Error updating  with id=" + id
      });
    });


}






  module.exports.addconsumer = addconsumer;
  module.exports.getAllSellers = getAllSellers;
  module.exports.updateConsumer = updateConsumer;