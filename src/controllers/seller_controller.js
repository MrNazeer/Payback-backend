const sellerModel = require("../models/seller_model");
const consumerModel = require("../models/consumer_model");
const transactionModel = require("../models/transaction_model");



//add seller
const addseller = async (req, res) => {
    console.log(req.body);
    const seller = new sellerModel(req.body);
  
    try {
      await seller.save();
      res.send(seller);
    } catch (error) {
      res.status(500).send(error);
    }
  };




  // get the all details of seller using object ID

  const detailsOfSeller = async (req, res) => {
    console.log("called..................");
  try {
    const data = await sellerModel.findById(req.params.id);
    res.json(data)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




//update seller details based on object Id

const updateSeller = async (req, res) =>{

  console.log("called..................");

  if (!req.body) {
    return res.status(400).json({"msg":"Data cant be empty"})    
  }
  const id = req.params.id;

  sellerModel.findByIdAndUpdate(id, req.body)
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




// Adding Consumer name and limit in seller schema

const addConsumerInSeller = async (req, res) =>{

  console.log("called..................");

  if (!req.body) {
    return res.status(400).json({"msg":"Data cant be empty"})    
  }
  const sellerid = req.params.id;
  const consumerId = req.body.ConsumerId;

  sellerModel.findByIdAndUpdate(sellerid, {$push:{"ConsumerDetails": req.body}})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update  with Seller id=${sellerid}. Maybe id was not found!`
        });
      } 
    })

    consumerModel.findByIdAndUpdate(consumerId, {$push:{"sellerSName": req.params.id}})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update  with Consumer id=${sellerid}. Maybe id was not found!`
        });
      } 
      else res.send({ message: "Consumer name and seller name is updated successfully.",data:data });
    })

    .catch(err => {
      res.status(500).send({
        message: "Error updating  with id=" + sellerid
      });
    });

}

// delete a consumer using consumer Id that is scan by seller or delete by del btn


const removeConsumer =  async (req,res) =>{
  
  console.log("called..................");

  if (!req.body) {
    return res.status(400).json({"msg":"Data cant be empty"})    
  }
  const sellerid = req.params.id;
  const consumerId = req.body.ConsumerId;

  sellerModel.findByIdAndUpdate(sellerid, {$pull:{"ConsumerDetails": {"ConsumerId": consumerId}}})
    .then(data => {
      console.log(data,"++++++++++++++");
      if (!data) {
        res.status(404).send({
          message: `Cannot update  with Seller id=${sellerid}. Maybe id was not found!`
        });
      } 
      // else res.send({ message: "Consumer name and seller name removed successfully.",data:data });
    })

    consumerModel.findByIdAndUpdate(consumerId, {$pull:{"sellerSName": req.params.id}})
    .then(data => {
      console.log(data,"++++++++++++++");
      if (!data) {
        res.status(404).send({
          message: `Cannot update  with Consumer id=${consumerId}. Maybe id was not found!`
        });
      } else res.send({ message: "Consumer name and seller name removed successfully.",data:data });
    })

    .catch(err => {
      res.status(500).send({
        message: "Error updating  with id=" + sellerid
      });
    });
 

}




  module.exports.addseller = addseller;
  module.exports.detailsOfSeller = detailsOfSeller;
  module.exports.updateSeller = updateSeller;
  module.exports.addConsumerInSeller = addConsumerInSeller;
  module.exports.removeConsumer = removeConsumer;
