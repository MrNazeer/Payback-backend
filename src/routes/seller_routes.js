const express = require("express");
const router = express.Router();

const {
    addseller,
    detailsOfSeller,
    updateSeller,
    addConsumerInSeller,
    removeConsumer
} = require("../controllers/seller_controller")


router.post("/signin_seller", addseller);

router.post("/login_seller", );

router.get("/detailsOfSeller/:id", detailsOfSeller);

router.patch("/updateSeller/:id", updateSeller);

router.patch("/add_cosnumer/:id", addConsumerInSeller);

router.patch("/del_consumer/:id", removeConsumer);


module.exports = router;
