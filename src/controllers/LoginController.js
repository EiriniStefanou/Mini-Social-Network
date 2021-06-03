const passport = require("passport");
const Controller = require("./Controller");

class LoginController extends Controller {
  constructor() {
    super();
  }

  path = "/auth";

  routes = [
    {
      path: "/login",
      method: "GET",
      handler: this.loadLoginView,
      localMiddlewares: [],
    },

    {
      path: "/loginUser",
      method: "POST",
      handler: this.login,
      localMiddlewares: [
        passport.authenticate("local", {
          failureRedirect: "/auth/login",
        }),
      ],
    },
  ];

  loadLoginView(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.render("pages/auth/login", { user: null, auth: false });
    }
  }

  login(req, res) {
    res.redirect("/");
  }
}

module.exports = LoginController;
