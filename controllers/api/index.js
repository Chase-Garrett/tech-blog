// import router
const router = require("express").Router();
// import userRoutes
const userRoutes = require("./userRoutes");
// import postRoutes
const postRoutes = require("./postRoutes");
// import commentRoutes
const commentRoutes = require("./commentRoutes");

// use the userRoutes
router.use("/users", userRoutes);
// use the postRoutes
router.use("/posts", postRoutes);
// use the commentRoutes
router.use("/comments", commentRoutes);

// export the module
module.exports = router;
