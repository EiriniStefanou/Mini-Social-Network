const Controller = require("./Controller");

class LoginController extends Controller {
  path = "/auth";

  routes = [
    {
      path: "/login",
      method: "GET",
      handler: this.loadLoginView,
      localMiddlewares: [],
    },
  ];

  loadLoginView(req, res) {
    res.render("pages/auth/login");
  }
}

module.exports = LoginController;
