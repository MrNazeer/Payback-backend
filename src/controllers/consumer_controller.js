const { ObjectID } = require("bson");
const consumerModel = require("../models/consumer_model");
const sellerModel = require("../models/seller_model");
const transactionModel = require("../models/transaction_model");

// SignUp Consumer

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

//Gauth login consumer

const gauthConsumer = async (req, res) => {
  console.log("Auth Model Called");
  
  if(!req.body){
    return res.status(400).json({"msg":"server error"})    
  }
  const consumerGI = req.body.googleId;

  try{
    await consumerModel.findOne({googleId:consumerGI}).then(data =>{
      if (data) {
        res.status(200).send({message:"Login SuccessFully", data})
      }
      else res.status(404).send({message:"Please Signup Using gmail"})
    })
  }
  catch (err){
    res.status(500).json({
      message: err.message,
    });
  }

}


//Login consumer
  const loginConsumer = async (req, res) =>{
    console.log("login Module calleeeeeed");
    if (!req.body) {
      return res.status(400).json({"msg":"pls enter email and password cant be empty"})    
    }

    const usermail = req.body.mail;
    const passWord = req.body.password;

    try{
      await consumerModel.findOne({mail:usermail}).then(data =>{
        if(data){
        if(data.password == passWord){
          res.status(200).send({message:"Login Successfully",data});
        }
        else{
          res.status(404).send({message:"MailId and Password is wrong"});
        }
      }
      else{
        res.status(404).send({message:"Please check Your mail Id"});
      }
      })
    }
    catch (err){
      res.status(500).json({
        message: err.message,
      });
    }
  }




// get user details including shops name using Objectid.


  const getAllSellers = async (req, res) => {
    console.log("getAllSellers called..................",req.params.id);
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
  module.exports.loginConsumer = loginConsumer;
  module.exports.gauthConsumer = gauthConsumer;