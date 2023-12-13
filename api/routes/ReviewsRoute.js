const express = require("express");
const { createNewReview, getAllReview, deleteReview } = require("../controllers/reviewController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router()


router.route("/product/review/:id").put(isAuthenticated,createNewReview).get(getAllReview).delete(isAuthenticated,deleteReview) 

module.exports = router;