// import router
const router = require("express").Router();
// import the user model
const { User } = require("../../models");

// create user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      user_name: req.body.user_name,
      password: req.body.password
    });

    // set up sessions with a 'logged_in' variable set to `true`
    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    // find the user who matches the posted username
    const userData = await User.findOne({
      where: { user_name: req.body.user_name }
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }

    // verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }

    // set up sessions with a 'logged_in' variable set to `true`
    req.session.save(() => {
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// logout
router.post("/logout", (req, res) => {
  // when the user logs out, destroy the session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // when the user logs out, destroy the session
    res.status(404).end();
  }
});

// export the router
module.exports = router;
