// import router
const router = require("express").Router();
// import the models
const { Comment } = require("../../models");
// import the authorization middleware
const withAuth = require("../../utils/auth");

// create a comment
router.post("/", withAuth, async (req, res) => {
  try {
    // create a new comment
    await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });

    //res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// export the router
module.exports = router;
