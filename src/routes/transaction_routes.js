const express = require("express");
const router = express.Router();

const {
    addTransation,
    getOverallSellerTransaction,
    getOverallConsumerTransaction,
    getIndiConsumerTransaction,
    delATransaction,
    delAllTransaction
} = require("../controllers/transaction_controller")

router.get("/get_overAllTrans_seller/:id", getOverallSellerTransaction);

router.get("/get_overAllTrans_consumer/:id", getOverallConsumerTransaction );

router.get("/get_IndividualTrans_consumer/", getIndiConsumerTransaction );

router.post("/add_transaction/", addTransation);

router.delete("/del_transaction/:id", delATransaction);

router.delete("/del_allTransaction/",delAllTransaction);


module.exports = router;

