const express = require("express");
const router = express.Router();
const { followUser, getFollowedReviews } = require("../controllers/socialController");

router.post("/:userId/follow/:targetUserId", followUser);
router.get("/:userId/followed-reviews", getFollowedReviews);

module.exports = router;
