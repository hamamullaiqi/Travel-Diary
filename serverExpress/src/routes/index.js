const express = require("express");

const { register, login, checkAuth } = require("../controllers/auth");
const { addJourney, getJourneys, getJourney,  getUserJourneys, updateJourney, updateThumbJourney, deleteJourney } = require("../controllers/journey");
const {
	addBookmark,
	getBookmarks,
	getBookmark,
	deleteBookmark,
} = require("../controllers/bookmark");
const { getUsers, getUser, updateProfile, updateAvatarProfile } = require("../controllers/user");

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
router.patch("/profile/:id", updateProfile);
router.patch("/profile/:id/avatar",uploadFile("image"), updateAvatarProfile)



//journey
router.post("/journey", uploadFile("image"),  addJourney);  
router.get("/journeys", getJourneys);
router.get("/journey/:id", getJourney);
router.get("/profile/:id/journey",auth, getUserJourneys);
router.patch("/journey/:id",auth, updateJourney);
router.patch("/journey/:id/thumb",auth, uploadFile("image"), updateThumbJourney);
router.delete("/journey/:id",auth, deleteJourney );
	




//boomark
router.post("/bookmark", addBookmark);
router.get("/bookmarks", getBookmarks);
router.get("/bookmark/:id", getBookmark);
router.delete("/bookmark/:id", deleteBookmark);

//chek auth
router.get("/check-auth", auth, checkAuth);



module.exports = router;
