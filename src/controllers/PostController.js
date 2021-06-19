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

  async loadCreatePostView(req, res) {
    let user = await User.findOne({ where: { accountId: req.user.id } });

    user.email = req.user.email;

    if (req.isAuthenticated()) {
      res.render("pages/posts/createPost", { user, auth: true });
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
