const transactionModel = require("../models/transaction_model");
const sellerModel = require("../models/seller_model");
const consumerModel = require("../models/consumer_model");

//add a transactoion

const addTransation = async (req, res) => {
  console.log("getOverallSellerTransaction Called......")
    const sellerId = req.body.sellerId;
    const consumerId = req.body.consumerId;
    const amount = req.body.amount;
    const date = req.body.date;
    const purpose = req.body.purpose;

  //retriving sellerName

    const sellerDetails = await sellerModel.findById(sellerId)
      if (!sellerDetails){
        res.status(404).send({message:"seller Id not found"})
        return;
      }

      const shopName = sellerDetails.shopName;

  //retriving consumerName

      const consumerDetails = await consumerModel.findById(consumerId)
      if (!consumerDetails){
        res.status(404).send({message:"seller Id not found"})
        return;
      }

      const consumerName = consumerDetails.fName;

     



  //Upadting seller side Total Amt

      await sellerModel.updateOne(
        { _id: sellerId , 'Consumers.ConsumerId': consumerId },
        { $inc: { 'Consumers.$.TotalAmt': amount } }).then(data =>{
          if(!data) {
            res.status(404).send({message:"not"});
          }          
        })

  //Upadting consumer side Total Amt

      await consumerModel.updateOne(
        { _id: consumerId , 'sellers.sellerId': sellerId },
        { $inc: { 'sellers.$.totalAmt': amount } }).then(data =>{
          if(!data) {
            res.status(404).send({message:"not"});
          }
            // else res.send({ message: "total amt is updated successfully.",data:data });
        })
    


    const transaction = new transactionModel({
      "consumerId": consumerId,
      "sellerId": sellerId,
      "amount": amount,
      "purpose": purpose,
      "date": date,
      "sellerShopName": shopName,
      "consumerName":consumerName
    });
  
    try {
      await transaction.save();
      res.send(transaction);
    } catch (error) {
      res.status(500).send(error);
    }

  };

  //Add Transaction end here.............



//get Over all Seller Transaction

  const getOverallSellerTransaction = async (req, res) => {
        console.log("getOverallSellerTransaction Called......",req.params.id)
    try {
      const data = await transactionModel.find({"sellerId" : req.params.id})
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  //get Over all Seller Transaction end here.......................



  // get Over all Consumer Transaction using one object id either seller or consumer

  const getOverallConsumerTransaction = async (req, res) => {
    console.log(" getOverallConsumerTransaction Called......")
try {
  const data = await transactionModel.find({"consumerId" : req.params.id})
  res.status(200).json(data);
} catch (error) {
  res.status(500).json({
    message: error.message,
  });
}
};

// get Over all Consumer Transaction using one object id either seller or consumer end here..............



//get the transaction between particular consumer and seller 

const getIndiConsumerTransaction = async (req, res) => {
    console.log("getIndiConsumerTransaction Called......",req.query.sellerId, req.query.consumerId)
try {
  const data = await transactionModel.find({"consumerId" : req.query.consumerId, "sellerId" : req.query.sellerId})
  res.status(200).send(data);
  console.log(data)
} catch (error) {
  res.status(500).json({
    message: error.message,
  });
}
};

//get the transaction between particular consumer and seller end here ....................




//Del a Transaction using transaction ID

const delATransaction =  async (req,res) =>{

  console.log("delATransaction Called............");

  let consumerId = req.query.consumerId;
  let sellerId = req.query.sellerId;
  let TransId = req.query.id;
  let amt = req.query.amt;

  console.log("cid :",consumerId, "Sid: ",sellerId, "TranId: ",TransId,"Amt :",amt);

  
  try {

    //Upadting seller side Total Amt

    await sellerModel.updateOne(
      { _id: sellerId , 'Consumers.ConsumerId': consumerId },
      { $inc: { 'Consumers.$.TotalAmt': -amt } }).then(data =>{
        if(!data) {
          res.status(404).send({message:"not"});
        }else{
          console.log("am here 1",TransId);
        }          
      })

    //Upadting consumer side Total Amt

    await consumerModel.updateOne(
      { _id: consumerId , 'sellers.sellerId': sellerId },
      { $inc: { 'sellers.$.totalAmt': -amt } }).then(data =>{
        if(!data) {
          res.status(404).send({message:"not"});
        }
        else{
          console.log("am here 2",TransId);
        }     
          // else res.send({ message: "total amt is updated successfully.",data:data });
      })


    await transactionModel.deleteOne({_id: TransId}).then((data)=>{
      if(data) {
        res.status(200).json({"msg":`Deleted Successfully`});
      }else{
        console.log("am here 3",TransId);
      }       
    }).catch((err)=>{
      res.status(404).send({message:"Not deleted",err});
    })
    
    
  } 
  catch (error) {
    res.send(error)
  }

}

//Del a Transaction using transaction ID end here.....................




//Del all Transaction using seller ID and Consumer ID.


const delAllTransaction =  async (req,res) =>{

  console.log(" delAllTransaction Called............",req.query.consumerId,req.query.sellerId);

  
  try {

    await transactionModel.deleteMany({"consumerId" : req.query.consumerId, "sellerId" : req.query.sellerId})

    //Upadting seller side Total Amt

    await sellerModel.updateOne(
      { _id: req.query.sellerId , 'Consumers.ConsumerId': req.query.consumerId },
      { $set: { 'Consumers.$.TotalAmt': 0 } }).then(data =>{
        if(!data) {
          res.status(404).send({message:"not"});
        }          
      })

    //Upadting consumer side Total Amt

    await consumerModel.updateOne(
      { _id: req.query.consumerId , 'sellers.sellerId': req.query.sellerId },
      { $set: { 'sellers.$.totalAmt': 0 } }).then(data =>{
        if(!data) {
          res.status(404).send({message:"not"});
        }
      })

    
    res.status(200).json({"msg":`Deleted Successfully`})
  } catch (error) {
    res.send(error)
  }

}

//Del all Transaction using seller ID and Consumer ID end here........................


// Get Transation based On date

// const TransactionGetterByDate = async(req, res)=>{
//   sellerId = req.params.id;
//   startDate = req.query.startDate;
//   endDate = req.query.endDate;

//   let transactions = await transactionModel.find({"sellerId":sellerId});

//   if (startDate && endDate) {
//     transactions = transactions.filter((transaction) => {
//       const date = new Date(transaction.date);
//       return date >= new Date(startDate) && date <= new Date(endDate);
//     });
//   }
//   res.send(transactions);
  

// }


// Get Transation based On date end here...........................








  module.exports.addTransation = addTransation;
  module.exports.getOverallSellerTransaction = getOverallSellerTransaction;
  module.exports.getOverallConsumerTransaction = getOverallConsumerTransaction;
  module.exports.getIndiConsumerTransaction = getIndiConsumerTransaction;
  module.exports.delATransaction = delATransaction;
  module.exports.delAllTransaction = delAllTransaction;


