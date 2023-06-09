const sellerModel = require("../models/seller_model");
const consumerModel = require("../models/consumer_model");
const transactionModel = require("../models/transaction_model");



//SignUP seller
const addseller = async (req, res) => {
    // console.log(req.body);
    console.log("SignUP seller Module calleeeeeed");
    const seller = new sellerModel(req.body);
  
    try {
      if(seller){
      await seller.save();
      res.status(200).send(seller);
    }
    else{
      res.status(404).send({message:"Please Enter All the Required Data !"})
    }
    } catch (error) {
      res.status(500).send(error);
    }
  };

//Seller Login checking....

const loginSeller = async (req, res) =>{
  console.log("Seller login Module calleeeeeed");
  if (!req.body) {
    return res.status(400).json({"msg":"pls enter email and password cant be empty"})    
  }

  const usermail = req.body.gmail;
  const passWord = req.body.password;

  try{
    await sellerModel.findOne({gmail:usermail}).then(data =>{
      if (data){
      if(data.password == passWord){
        res.status(200).send({message:"Login Successfully",data});
      }
      else{
        res.status(404).send({message:"MailId and Password is wrong"});
      }
    }
    else{
      res.status(404).send({message:"Plese check your MailID"});
    }
    })
  }
  catch(error) {
    res.status(500).send(error);
  }
}





// get the all details of seller using object ID

  const detailsOfSeller = async (req, res) => {
    console.log("detailsOfSeller called..................",req.params.id);
  try {
    const data = await sellerModel.findById(req.params.id);
    res.send(data);
    console.log("data",data);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};




//update seller details based on object Id

const updateSeller = async (req, res) =>{

  console.log(" updateSeller called..................");

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




// Adding New Consumer name and limit in seller schema and adding seller name and id along with amt

const addConsumerInSeller = async (req, res) =>{

  console.log("addConsumerInSeller called..................","",req.params.id,"",req.body.ConsumerId,"",req.body.limit,"",req.body.shopName);

  if (!req.body) {
    return res.status(400).json({"msg":"Data cant be empty"})    
  }
  const sellerid = req.params.id;
  const consumerId = req.body.ConsumerId;
  const consumerLimit = req.body.limit;
  const shopname = req.body.shopName;

  //Finding Consumer name in consumer collection

  const consumerData = await consumerModel.findById(consumerId);
  if (!consumerData) {
    res.status(404).send({
      message: `Consumer Not exist`
    });
    return;
  }

  //Assign the  Consumer name and mail 

  const cname = consumerData.fName;
  const cmail = consumerData.mail;

  //Find the seller Id and Update Consumer details along with limit

  await sellerModel.findByIdAndUpdate(sellerid, {$push:{"Consumers":[{
    "ConsumerId":consumerId,
    "ConsumerName":cname,
    "mail":cmail,
    "limit":consumerLimit
  }] }})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update  with Seller id=${sellerid}. Maybe id was not found!`
        });
      } 
      
    })

  //Find the Consumer Id and Update seller details along with limit      

    await consumerModel.findByIdAndUpdate(consumerId, {$push:{"sellers": [{
      "shopName":shopname,
      "sellerId":sellerid,
      "sellerLimit":consumerLimit
    }]}})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update  with Consumer id=${consumerId}. Maybe id was not found!`
        });
      } 
      else res.send({ message: "Consumer name and seller name is updated successfully.",data:data});
    })

    .catch(err => {
      res.status(500).send({
        message: "Error updating  with id=" + sellerid
      });
    });

}


// delete a consumer using consumer Id that is scan by seller or delete by del btn


const removeConsumer =  async (req,res) =>{
  
  console.log(" removeConsumer called..................","",req.params.id,"",req.body.ConsumerId);

  if (!req.body) {
    return res.status(400).json({"msg":"Data cant be empty"})    
  }
  const sellerid = req.params.id;
  const consumerid = req.body.ConsumerId;
  
  //removing cosnumer details from seller collection  
  
       await sellerModel.findOneAndUpdate(
          { _id: sellerid },
          { $pull: { Consumers: { ConsumerId: consumerid } } },
          { new: true }
        )
        .then((data) => {
          if(!data){
            res.status(404).send({message:"He is not your Consumer to remove please cheack your consumer list"});
          }      
        })
                          
  //removing seller details from consumer collection 
        await consumerModel.findOneAndUpdate(
          { _id: consumerid },
          { $pull: { sellers: { sellerId: sellerid } } },
          { new: true }
        )
        .then((data) => {
          if(!data){
            res.status(404).send({message:"seller id not found to remove"});
          }
        })

  //Removing all the transaction from transsaction collection based on two id

        await transactionModel.deleteMany({"consumerId" : consumerid, "sellerId" : sellerid}).then((data) => {
          if(!data){
            res.status(404).send({message:"Deleted succeccfully but No Transaction has been made..!"});
          }
          else res.send({ message: "All the Transaction are Deleted Successfully.",data});
        })

    .catch(err => {
      res.status(500).send({
        message: "Error updating  with id=" + sellerid
      });
    });
 

}




//Update Limit for consumer and also reflict in Seller

const upadteLimit = async(req,res) => {
  console.log("upadteLimit calleeed......");
  
  if (!req.body) {
    return res.status(400).json({"msg":"Data cant be empty"})    
  }
  else{
    console.log(req.body.ConsumerId);
    console.log(req.body.limit);
    console.log(req.params.id);
  }
  const sellerid = req.params.id;
  const consumerId = req.body.ConsumerId;
  const consumerLimit = req.body.limit;
  

  //Update Limit in seller Side presented consumer

  await sellerModel.updateOne(
    {_id:sellerid, "Consumers.ConsumerId": consumerId},
    { $set: { "Consumers.$.limit": consumerLimit } }
  ).then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update  with Seller id=${sellerid}. Maybe id was not found!`
        });
      } 
      
    })



  //Update Limit in Cosnumer side presented seller 

  await consumerModel.updateOne({_id:consumerId,"sellers.sellerId":sellerid},
  {$set:{"sellers.$.sellerLimit":consumerLimit}})
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update  with Consumer id=${sellerid}. Maybe id was not found!`
      });
    } 
    else res.send({ message: "Limit is updated successfully.",data:data });
  }).catch(err => {
    res.status(500).send({
      message: "Cannot upadte limit"
    });
  });

}

//Update Limit in Cosnumer side presented seller end here............



// Mailsending function Start here....................................

const nodemailer = require("nodemailer");

const mailSenderForConsumer = async (req, res) => {
  const consumerMailId = req.body.conMailId;
  const sellerMailid = req.body.sellerMailId;
  const sellerName = req.body.sellerName;
  const amount = req.body.amount;

  console.log("consumerMailId",consumerMailId);
  console.log("sellerMailid",sellerMailid);
  console.log("sellerName",sellerName);
  console.log("amount",amount);


  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "paybackorganization@gmail.com",
      pass: "zoriywvnrsdhlblx",
    },
  }); 

  try {
    await transporter.sendMail({
      from: 'paybackorganization@gmail.com',
      to:consumerMailId,
      subject: "From PayBack Team About Your credit Amount",
      html: `
        <h1>Hello there</h1>
        <p>You Have to Pay <b>Rs.${amount}</b> to <b>${sellerName}</b>. Please pay as soon as possible !.</p>
        <p>Are else please contact your seller <b>${sellerName}</b> and his Gmail ${sellerMailid}</p>
        <br/>
        <br/>
        <br/>
        <h4>Team PayBack</h4>
      `,
    }); 
    res.status(200).send("Mail sent successfully");
  } catch(err) {
    console.error(err);
    res.status(500).send("An error occurred while sending the email");
  }
}


// Mailsending function End here....................................




  module.exports.addseller = addseller;
  module.exports.detailsOfSeller = detailsOfSeller;
  module.exports.updateSeller = updateSeller;
  module.exports.addConsumerInSeller = addConsumerInSeller;
  module.exports.removeConsumer = removeConsumer;
  module.exports.loginSeller = loginSeller;
  module.exports.upadteLimit = upadteLimit;
  module.exports.mailSenderForConsumer = mailSenderForConsumer;