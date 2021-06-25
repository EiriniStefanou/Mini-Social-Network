const Post = require("../models/Post");
const User = require("../models/User");
const Controller = require("./Controller");

class PostController extends Controller {
  constructor() {
    super();
  }

  path = "/";

  routes = [
    {
      path: "/createPost/view",
      method: "GET",
      handler: this.loadCreatePostView,
      localMiddlewares: [],
    },

    {
      path: "/createPost",
      method: "POST",
      handler: this.createPost,
      localMiddlewares: [],
    },

    {
      path: "/showPost/:postId",
      method: "GET",
      handler: this.showPost,
      localMiddlewares: [],
    },

    {
      path: "/updatePost/view/:postId",
      method: "GET",
      handler: this.loadUpdatePostView,
      localMiddlewares: [],
    },

    {
      path: "/updatePost/:postId",
      method: "POST",
      handler: this.updatePost,
      localMiddlewares: [],
    },

    {
      path: "/deletePost/:postId",
      method: "POST",
      handler: this.deletePost,
      localMiddlewares: [],
    },
  ];

  async loadCreatePostView(req, res) {
    if (req.isAuthenticated()) {
      let user = await User.findOne({ where: { accountId: req.user.id } });

      res.render("pages/posts/createPost", { user, auth: true });
    } else {
      res.redirect("/");
    }
  }

  async createPost(req, res) {
    if (req.isAuthenticated()) {
      const { title, description } = req.body;

      const user = await User.findOne({ where: { accountId: req.user.id } });

      await Post.create({
        title,
        description,
        userId: user.id,
      });

      res.redirect("/");
    } else {
      res.redirect("/auth/login");
    }
  }

  async showPost(req, res) {
    if (req.isAuthenticated()) {
      const { postId } = req.params;

      const user = await User.findOne({ where: { accountId: req.user.id } });

      const post = await Post.findOne({
        where: { id: postId },
        include: {
          model: User,
          as: "User",
        },
      });

      res.render("pages/posts/showPost", { user, post, auth: true });
    } else {
      res.redirect("/");
    }
  }

  async loadUpdatePostView(req, res) {
    if (req.isAuthenticated()) {
      const postId = req.params.postId;
      let user = await User.findOne({ where: { accountId: req.user.id } });

      const post = await Post.findOne({
        where: { id: postId },
      });

      res.render("pages/posts/updatePost", { user, post, auth: true });
    } else {
      res.redirect("/");
    }
  }

  async updatePost(req, res) {
    if (req.isAuthenticated()) {
      const postId = req.params.postId;
      const { title, description } = req.body;

      await Post.update(
        {
          title,
          description,
        },
        { where: { id: postId } }
      );

      res.redirect("/myProfile/myPosts");
    } else {
      res.redirect("/");
    }
  }

  async deletePost(req, res) {
    if (req.isAuthenticated()) {
      const user = await User.findOne({ where: { accountId: req.user.id } });

      const postId = req.params.postId;

      const post = await Post.findOne({
        where: { id: postId },
        include: {
          model: User,
          as: "User",
        },
      });

      if (user.name === post.User.name || user.role === "admin") {
        await Post.destroy({ where: { id: postId } });
      }

      if (user.role === "admin") {
        res.redirect("/overview/dashboard");
      } else {
        res.redirect("/myProfile/myPosts");
      }
    } else {
      res.redirect("/");
    }
  }
}

module.exports = PostController;
