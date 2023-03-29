const mongoose = require("mongoose");


// const sellerNamesSchema = new mongoose.Schema({
//     sellerName:{ type : String,
//     required: false}
//   });

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
            type: String,
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
        sellerSName:{
            type: Array,
            required:false,
        },
        googleId:{
            type:string,
            required:false,
        },
        image:{
            type:string,
            required:false,
        }
    }
);

module.exports = mongoose.model("consumer", consumerSchema);