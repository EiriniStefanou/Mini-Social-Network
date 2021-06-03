const Post = require("../models/Post");
const Controller = require("./Controller");

class PostController extends Controller {
  constructor() {
    super();
  }

  path = "/";

  routes = [
    {
      path: "/createPost",
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
  ];

  loadCreatePostView(req, res) {
    if (req.isAuthenticated()) {
      res.render("pages/posts/createPost", { user: req.user, auth: true });
    } else {
      res.redirect("/");
    }
  }

  async createPost(req, res) {
    const data = req.body;

    await Post.create(data);

    res.redirect("/");
  }
}

module.exports = PostController;
