const Post = require("../models/Post");
const Controller = require("./Controller");

class WelcomeController extends Controller {
  constructor() {
    super();
  }

  path = "/";

  routes = [
    {
      path: "/",
      method: "GET",
      handler: this.handleWelcomePage,
      localMiddlewares: [],
    },
  ];

  async handleWelcomePage(req, res) {
    if (req.isAuthenticated()) {
      const posts = await Post.findAll();
      res.render("pages/welcome", {
        user: req.user,
        posts: posts,
        auth: req.isAuthenticated(),
      });
    } else {
      res.redirect("/auth/login");
    }
  }
}

module.exports = WelcomeController;
