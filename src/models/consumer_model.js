const mongoose = require("mongoose");


const sellerDetailsSchema = new mongoose.Schema({
    shopName:{ type : String, required: false},
    sellerId:{ type : String, required: false},
    sellerLimit:{ type : Number, required: false},
    totalAmt:{type : Number, default: 0}
  });

const consumerSchema = new mongoose.Schema(
    {
        fName:{
            type: String,
            required: true,
        },
        lName:{
            type: String,
            required:true,
        },
        mobNo:{
            type: Number,
            required:false,

        },
        mail:{
            type: String,
            required:false,
            unique:true,
        },
        password:{
            type: String,
            required:false,
        },
        image:{
            type: String,
            required:false,
        },
        sellers:{
            type: [sellerDetailsSchema],
            required:false,
        }
    }
);

module.exports = mongoose.model("consumer", consumerSchema);