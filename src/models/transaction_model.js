const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        consumerId:{
            type: String,
            required: true,
        },
        sellerId:{
            type: String,
            required:true,
        },
        amount:{
            type: Number,
            required:true,
        },
        date:{
            type: Date,
            required:false,
        },
        purpose:{
            type: String,
            required:true,
        },
        sellerShopName:{
            type: String,
            required:true,
        },
        consumerName:{
            type: String,
            required:true,
        }
    }
);

module.exports = mongoose.model("transaction", transactionSchema);