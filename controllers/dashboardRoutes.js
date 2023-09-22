// import router from express
const router = require("express").Router();
// import the models
const { Post, User } = require("../models");
// import the auth
const withAuth = require("../utils/auth");

// get all posts by a specific user
router.get("/", withAuth, async (req, res) => {
  try {
    // get all post and JOIN with user data
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ["user_name"]
        }
      ]
    });

    // serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // pass serialized data and session flag into template
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// export the module
module.exports = router;
