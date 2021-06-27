const Account = require("../models/Account");
const Post = require("../models/Post");
const Reaction = require("../models/Reaction");
const User = require("../models/User");
const Controller = require("./Controller");

class ReactionController extends Controller {
  constructor() {
    super();
  }

  path = "/reactions";

  routes = [
    {
      path: "/like/:postId/:page",
      method: "POST",
      handler: this.likePost,
      localMiddlewares: [],
    },

    {
      path: "/unlike/:postId/:page",
      method: "POST",
      handler: this.unlikePost,
      localMiddlewares: [],
    },
  ];

  async likePost(req, res) {
    if (req.isAuthenticated()) {
      const { postId, page } = req.params;
      const user = await User.findOne({ where: { accountId: req.user.id } });

      const post = await Post.findOne({ where: { id: postId } });

      await Reaction.create({
        userId: user.id,
        postId: post.id,
      });

      if (page === "welcome") {
        res.redirect("/");
      } else if (page === "search") {
        res.redirect("/search/posts");
      } else if (page === "singlePost") {
        res.redirect(`/showPost/${postId}`);
      }
    } else {
      res.redirect("/auth/login");
    }
  }

  async unlikePost(req, res) {
    if (req.isAuthenticated()) {
      const { postId, page } = req.params;
      const user = await User.findOne({ where: { accountId: req.user.id } });

      const post = await Post.findOne({
        where: { id: postId },
      });

      await Reaction.destroy({
        where: {
          userId: user.id,
          postId: post.id,
        },
      });

      if (page === "welcome") {
        res.redirect("/");
      } else if (page === "search") {
        res.redirect("/search/posts");
      } else if (page === "singlePost") {
        res.redirect(`/showPost/${postId}`);
      }
    } else {
      res.redirect("/auth/login");
    }
  }
}

module.exports = ReactionController;
