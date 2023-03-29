const express = require("express");
const router = express.Router();

const {
    addconsumer,
    getAllSellers,
    updateConsumer
} = require("../controllers/consumer_controller")

router.post("/signin_consumer", addconsumer );

router.post("/login_consumer", );

router.get("/getallshops/", getAllSellers);


router.patch("/update_consumer/:id", updateConsumer);

module.exports = router;
