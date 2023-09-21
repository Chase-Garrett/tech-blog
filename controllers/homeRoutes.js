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
      logged_in: req.session.logged_in,
      userid: req.session.user_id
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
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "post_text", "created_at"],
      include: [
        {
          model: User,
          attributes: ["user_name"]
        },
        {
          model: Comment,
          attributes: ["comment_text", "post_id", "created_at"],
          include: [
            {
              model: User,
              attributes: ["user_name"]
            }
          ]
        }
      ]
    });

    const commentData = await Comment.findAll({
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

    // serialize data
    const post = postData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    post.comments = comments;

    // pass serialized data and session flag into template
    res.render("post", {
      post,
      logged_in: req.session.logged_in,
      userid: req.session.user_id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // get one post to edit
// router.get("/edit/:id", withAuth, async (req, res) => {
//   try {
//     // get one post and join with user data
//     await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["user_name"]
//         }
//       ]
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// load the edit post page
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

    // serialize the data
    const post = postData.get({ plain: true });

    // pass serialized data and session flag into template
    res.render("edit", {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get login page
router.get("/login", (req, res) => {
  // if the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// get signup page
router.get("/signup", (req, res) => {
  // if the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// get new post page
router.get("/newPost", withAuth, (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  res.render("newPost", {
    logged_in: req.session.logged_in,
    userid: req.session.user_id
  });
});

// export the router
module.exports = router;
