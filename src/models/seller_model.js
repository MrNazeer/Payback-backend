const mongoose = require("mongoose");

const ConsumerLimitSchema = new mongoose.Schema({
    ConsumerId: { type: String, required: false },
    limit: { type: String, required: false },
  });
  

const sellerSchema = new mongoose.Schema(
    {
        Name:{
            type: String,
            required: true,
        },
        shopName:{
            type: String,
            required:true,
        },
        mobNo:{
            type: String,
            required:true,
        },
        gmail:{
            type: String,
            required:true,
        },
        password:{
            type: String,
            required:true,
        },
        ConsumerDetails:{
            type: [ConsumerLimitSchema],
            required:false,
        },
        googleId:{
            type:String,
            required:false,
        },
        image:{
            type:String,
            required:false,
        }

    }
);

module.exports = mongoose.model("seller", sellerSchema);