const Post = require("../models/Post");
const User = require("../models/User");
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
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            as: "User",
          },
        ],
      });

      const user = await User.findOne({ where: { accountId: req.user.id } });

      res.render("pages/welcome", {
        user,
        posts,
        auth: true,
      });
    } else {
      res.redirect("/auth/login");
    }
  }
}

module.exports = WelcomeController;
