const Post = require("../../models/Post");
const User = require("../../models/User");
const Account = require("../../models/Account");

const Controller = require("../Controller");

class UserController extends Controller {
  constructor() {
    super();
  }

  path = "/admin";

  routes = [
    {
      path: "/deleteUser/:accountId/:userId/",
      method: "POST",
      handler: this.deleteUser,
      localMiddlewares: [],
    },
  ];

  async deleteUser(req, res) {
    if (req.isAuthenticated()) {
      const { userId, accountId } = req.params;
      const user = await User.findOne({ where: { accountId: req.user.id } });

      if (user.role === "admin") {
        await User.destroy({
          where: {
            id: userId,
          },
        });

        await Account.destroy({
          where: {
            id: accountId,
          },
        });

        res.redirect("/overview/allUsers");
      } else {
        res.redirect("/");
      }
    } else {
      res.render("pages/auth/login", { user: null, auth: false });
    }
  }
}

module.exports = UserController;
