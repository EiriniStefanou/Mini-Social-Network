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

  getProfile(req, res) {
    if (req.isAuthenticated()) {
      res.render("pages/profile", {
        message: null,
        user: req.user,
        auth: true,
      });
    } else {
      res.redirect("/auth/login");
    }
  }

  async updateProfile(req, res) {
    if (req.isAuthenticated()) {
      await User.update(
        {
          email: req.body.email,
          name: req.body.name,
          surname: req.body.surname,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });

      res.redirect(`/user/${user.name}`);
    } else {
      res.redirect("/auth/login");
    }
  }
}

module.exports = ProfileController;
