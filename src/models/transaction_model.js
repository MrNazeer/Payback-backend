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
            type: String,
            required:true,
        },
        date:{
            type: String,
            required:true,
        },
        purpose:{
            type: String,
            required:true,
        }
    }
);

module.exports = mongoose.model("transaction", transactionSchema);