const Post = require("../../models/Post");
const User = require("../../models/User");
const Account = require("../../models/Account");

const Controller = require("../Controller");
const Reaction = require("../../models/Reaction");

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
        await Reaction.destroy({
          where: {
            userId,
          },
        });

        const posts = await Post.findAll({
          where: {
            userId,
          },
          include: [{ model: Reaction }],
        });

        const reactions = posts.map((post) => {
          if (post.Reactions.length > 0) {
            return post.Reactions.map((reaction) => {
              return reaction.id;
            });
          }
        });

        await Reaction.destroy({ where: { id: reactions } });
        console.log("iklbskdfjbgkjusdfhbg");
        await Post.destroy({
          where: {
            userId,
          },
        });

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
