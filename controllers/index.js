// import router
const router = require("express").Router();
// import the api routes
const apiRoutes = require("./api");
// import the home routes
const homeRoutes = require("./homeRoutes");
// import the dashboard routes
const dashboardRoutes = require("./dashboardRoutes");

// use the home routes
router.use("/", homeRoutes);
// use the dashboard routes
router.use("/dashboard", dashboardRoutes);
// use the api routes
router.use("/api", apiRoutes);

// export the module
module.exports = router;
