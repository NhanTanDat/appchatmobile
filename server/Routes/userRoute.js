const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  sendFriendRequest,
  acceptFriendRequest,
  getUserInfo,
  authenticateToken,
  getFriendRequestsById,
  getSenderInfoByReceiverIdHandler,
  finUserByID,
  updateAvatar
} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/find/user", findUser);
router.post("/userInfo", authenticateToken, getUserInfo);
router.post("/sendfriendrequest", sendFriendRequest);
router.post("/acceptfriendrequest", acceptFriendRequest);
router.post("/getfriendrequests",getFriendRequestsById)
router.post("/", getUsers);
router.post("/getsenderinfo", getSenderInfoByReceiverIdHandler);
router.post("/finduserbyid", finUserByID);

router.post("/updateAvatar",updateAvatar);

module.exports = router;
