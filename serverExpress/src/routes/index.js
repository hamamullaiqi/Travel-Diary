const express = require("express");

const { register, login, checkAuth } = require("../controllers/auth");
const { addJourney, getJourneys, getJourney,  getUserJourneys } = require("../controllers/journey");
const {
	addBookmark,
	getBookmarks,
	getBookmark,
	deleteBookmark,
} = require("../controllers/bookmark");
const { getUsers, getUser, updateprofile } = require("../controllers/user");

const router = express.Router();
//middleware
const { auth } = require("../middlewares/checkAuth");
const { uploadFile } = require("../middlewares/uploadImage");
// const { uploadImageFloara } = require("../middlewares/uploadImageFloara");



//auth
router.post("/register", register);
router.post("/login", login);

//user
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/profile/:id",uploadFile("image"), updateprofile);



//journey
router.post("/journey", uploadFile("image"),  addJourney);  
router.get("/journeys", getJourneys);
router.get("/journey/:id", getJourney);
router.get("/profile/:id/journey", getUserJourneys);
	




//boomark
router.post("/bookmark", addBookmark);
router.get("/bookmarks", getBookmarks);
router.get("/bookmark/:id", getBookmark);
router.delete("/bookmark/:id", deleteBookmark);

//chek auth
router.get("/check-auth", auth, checkAuth);



module.exports = router;
