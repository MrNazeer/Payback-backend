const express = require("express");
const mongoose = require("mongoose");
const consumerRouter = require("./src/routes/consumer_routes");
const sellerRouter = require("./src/routes/seller_routes");
const transactionRouter = require("./src/routes/transaction_routes");
const url = "mongodb+srv://nazeer:8Ho1T00x9AK3CDzR@nodelearning.ks06m4w.mongodb.net/paybackdb?retryWrites=true&w=majority";
const app = express();
const cors = require("cors");

app.use(cors())
app.use(express.json())

app.use("/consumer",consumerRouter);
app.use("/seller",sellerRouter);
app.use("/transaction",transactionRouter);


mongoose.connect(url);
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));

db.once("open", ()=>{
    console.log("connection success");
});


app.listen(5000,()=>{
    console.log("port is running on 5000");
})