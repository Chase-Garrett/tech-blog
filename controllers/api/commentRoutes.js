// import router
const router = require("express").Router();
// import the models
const { User, Post, Comment } = require("../../models");
// import the authorization middleware
const withAuth = require("../../utils/auth");

// get all comments for a post
router.get("/", async (req, res) => {
  try {
    // get all comments and JOIN with user data
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"]
        },
        {
          model: Post,
          attributes: ["title"]
        }
      ]
    });

    // serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // pass serialized data and session flag into template
    res.render("homepage", {
      comments,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all comments for a corresponding post
router.get("/post/:id", async (req, res) => {
  try {
    // get all comments and JOIN with user data
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ["username"]
        },
        {
          model: Post,
          attributes: ["title"]
        }
      ]
    });

    // serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // pass serialized data and session flag into template
    res.render("homepage", {
      comments,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one comment
router.get("/:id", async (req, res) => {
  try {
    // get one comment and JOIN with user data
    await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"]
        },
        {
          model: Post,
          attributes: ["title"]
        }
      ]
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a comment
router.post("/", withAuth, async (req, res) => {
  try {
    // create a new comment
    await Comment.create({
      ...req.body,
      user_id: req.session.user_id
    });

    // redirect to the homepage
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update a comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    // update a comment by its `id` value
    await Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // delete a comment by its `id` value
    await Comment.destroy({
      where: {
        id: req.params.id
      }
    });

    // redirect to the homepage
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// export the router
module.exports = router;
