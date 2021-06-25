const Controller = require("./Controller");

class LogoutController extends Controller {
  constructor() {
    super();
  }

  path = "/auth";

  routes = [
    {
      path: "/logout",
      method: "POST",
      handler: this.logout,
      localMiddlewares: [],
    },
  ];

  logout(req, res) {
    req.logout();

    res.redirect("/login");
  }
}

module.exports = LogoutController;
