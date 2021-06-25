const Post = require("../models/Post");
const User = require("../models/User");
const Controller = require("./Controller");

class ProfilePostsController extends Controller {
  constructor() {
    super();
  }

  path = "/myProfile";

  routes = [
    {
      path: "/myPosts",
      method: "GET",
      handler: this.loadUserPosts,
      localMiddlewares: [],
    },
  ];

  async loadUserPosts(req, res) {
    if (req.isAuthenticated()) {
      let user = await User.findOne({ where: { accountId: req.user.id } });

      const posts = await Post.findAll({ where: { userId: user.id } });

      res.render("pages/profilePosts", { user, posts, auth: true });
    } else {
      res.redirect("/");
    }
  }

  async createPost(req, res) {
    const { title, description } = req.body;

    const user = await User.findOne({ where: { accountId: req.user.id } });

    await Post.create({
      title,
      description,
      userId: user.id,
    });

    res.redirect("/");
  }
}

module.exports = ProfilePostsController;
