// import router
const router = require("express").Router();
// import the api routes
const apiRoutes = require("./api");
// import the home routes
const homeRoutes = require("./homeRoutes");

// use the home routes
router.use("/", homeRoutes);
// use the api routes
router.use("/api", apiRoutes);

// export the module
module.exports = router;
