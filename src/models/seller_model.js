const mongoose = require("mongoose");

const ConsumerdetailSchema = new mongoose.Schema({
    ConsumerId: { type: String, required: false },
    ConsumerName: { type: String, required: false },
    TotalAmt:{ type: Number, default: 0 },
    mail:{ type: String, required: false },
    limit: { type: Number, required: false },
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
            type: Number,
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
        Consumers:{
            type: [ConsumerdetailSchema],
            required:false,
        },
        image:{
            type:String,
            required:false,
        }

    }
);

module.exports = mongoose.model("seller", sellerSchema);