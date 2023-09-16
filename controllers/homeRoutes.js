// import router
const router = require("express").Router();
// import the models
const { User, Post, Comment } = require("../models");
// import the auth
const withAuth = require("../utils/auth");

// get all posts for homepage
router.get("/", async (req, res) => {
  try {
    // get all posts and join with user data
    const postData = await Post.findAll({
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
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get single post
router.get("/post/:id", async (req, res) => {
  try {
    // get
    await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["user_name"]
        }
      ]
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all posts for dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // get all posts and join with user data
    await Post.findAll({
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
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one post to edit
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // get one post and join with user data
    await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["user_name"]
        }
      ]
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all comments for single post
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // get all comments and join with user data
    await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ["user_name"]
        }
      ]
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// export the router
module.exports = router;
