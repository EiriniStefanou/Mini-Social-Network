const Account = require("../models/Account");
const User = require("../models/User");
const Controller = require("./Controller");

class ProfileController extends Controller {
  constructor() {
    super();
  }

  path = "/user";

  routes = [
    {
      path: "/:name",
      method: "GET",
      handler: this.getProfile,
      localMiddlewares: [],
    },

    {
      path: "/profile/update",
      method: "POST",
      handler: this.updateProfile,
      localMiddlewares: [],
    },
  ];

  async getProfile(req, res) {
    if (req.isAuthenticated()) {
      let user = await User.findOne({ where: { accountId: req.user.id } });

      user.email = req.user.email;

      res.render("pages/profile", {
        message: null,
        user,
        auth: true,
      });
    } else {
      res.redirect("/auth/login");
    }
  }

  async updateProfile(req, res) {
    if (req.isAuthenticated()) {
      const { email, name, surname } = req.body;

      if (email) {
        await Account.update(
          {
            email,
          },
          {
            where: {
              id: req.user.id,
            },
          }
        );
      }

      if (name || surname) {
        await User.update(
          {
            name,
            surname,
          },
          {
            where: {
              accountId: req.user.id,
            },
          }
        );
      }

      const user = await User.findOne({
        where: {
          accountId: req.user.id,
        },
      });

      res.redirect(`/user/${user.name}`);
    } else {
      res.redirect("/auth/login");
    }
  }
}

module.exports = ProfileController;
