const User = require("../models/User");
const Post = require("../models/post");
const Reaction = require("../models/Reaction");

const Controller = require("./Controller");

const sequelize = require("sequelize");

class SearchController extends Controller {
  constructor() {
    super();
  }

  path = "/search";

  routes = [
    {
      path: "/posts",
      method: "POST",
      handler: this.searchPosts,
      localMiddlewares: [],
    },
  ];

  async searchPosts(req, res) {
    if (req.isAuthenticated()) {
      const { search } = req.body;

      const user = await User.findOne({ where: { accountId: req.user.id } });

      const users = await User.findAll({
        where: {
          name: {
            [sequelize.Op.substring]: `%${search}%`,
          },
        },
      });

      const posts = await Post.findAll({
        where: {
          title: {
            [sequelize.Op.substring]: `%${search}%`,
          },
        },
        include: [
          { model: User },
          { model: Reaction, include: { model: User } },
        ],
      });

      res.render("pages/searchResults", {
        user,
        users,
        search,
        posts,
        auth: true,
      });
    } else {
      res.redirect("/auth/login");
    }
  }
}

module.exports = SearchController;
