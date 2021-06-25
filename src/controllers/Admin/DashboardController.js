const Post = require("../../models/Post");
const User = require("../../models/User");
const Account = require("../../models/Account");

const Controller = require("../Controller");

class DashboardController extends Controller {
  constructor() {
    super();
  }

  path = "/overview";

  routes = [
    {
      path: "/dashboard",
      method: "GET",
      handler: this.loadDashboard,
      localMiddlewares: [],
    },

    {
      path: "/allUsers",
      method: "GET",
      handler: this.loadDashboardAllUsers,
      localMiddlewares: [],
    },
  ];

  async loadDashboard(req, res) {
    if (req.isAuthenticated()) {
      const user = await User.findOne({ where: { accountId: req.user.id } });

      if (user.role === "admin") {
        const posts = await Post.findAll({
          include: {
            model: User,
            as: "User",
          },
        });

        res.render("adminPages/dashboard", { user, posts, auth: true });
      } else {
        res.redirect("/");
      }
    } else {
      res.render("pages/auth/login", { user: null, auth: false });
    }
  }

  async loadDashboardAllUsers(req, res) {
    if (req.isAuthenticated()) {
      const user = await User.findOne({ where: { accountId: req.user.id } });

      if (user.role === "admin") {
        const users = await User.findAll({
          include: {
            model: Account,
            as: "Account",
          },
        });

        res.render("adminPages/allUsers", { user, users, auth: true });
      } else {
        res.redirect("/");
      }
    } else {
      res.render("pages/auth/login", { user: null, auth: false });
    }
  }
}

module.exports = DashboardController;
