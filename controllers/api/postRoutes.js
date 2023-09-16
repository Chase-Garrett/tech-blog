// import router from 'express';
const router = require("express").Router();
// import the post, user, and comment models
const { Post, User, Comment } = require("../../models");
// import the authorization middleware
const withAuth = require("../../utils/auth");

// get all posts
router.get("/", async (req, res) => {
  try {
    // get all post and JOIN with user data
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
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one post
router.get("/post/:id", async (req, res) => {
  try {
    // get one post and JOIN with user data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["user_name"]
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at"
          ],
          include: [
            {
              model: User,
              attributes: ["user_name"]
            }
          ]
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    // serialize the data
    const post = postData.get({ plain: true });

    // pass serialized data and session flag into template
    res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all posts by a specific user
router.get("/dashboard", withAuth, async (req, res) => {
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
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one post to edit
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // get one post and JOIN with user data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["user_name"]
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    // serialize the data
    const post = postData.get({ plain: true });

    // pass serialized data and session flag into template
    res.render("edit-post", {
      post,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a post
router.post("/", withAuth, async (req, res) => {
  try {
    // create a new post
    await Post.create({
      title: req.body.title,
      post_text: req.body.post_text,
      user_id: req.session.user_id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update a post
router.put("/edit/:id", withAuth, async (req, res) => {
  try {
    // update a post by its `id` value
    await Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a post
router.delete("/dashboard/:id", withAuth, async (req, res) => {
  try {
    // delete a post by its `id` value
    await Post.destroy({
      where: {
        id: req.params.id
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// export the router
module.exports = router;
