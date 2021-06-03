const passport = require("passport");
const User = require("../models/User");
const Controller = require("./Controller");

const hashPassword = require("../helpers/hashPassword");

class RegisterController extends Controller {
  constructor() {
    super();
  }

  path = "/auth";

  routes = [
    {
      path: "/register",
      method: "GET",
      handler: this.loadRegisterView,
      localMiddlewares: [],
    },

    {
      path: "/register",
      method: "POST",
      handler: this.register,
      localMiddlewares: [],
    },
  ];

  loadRegisterView(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.render("pages/auth/register", { user: null, auth: false });
    }
  }

  async register(req, res) {
    const { email, name, surname, password } = req.body;

    const user = await User.create({
      email,
      name,
      surname,
      passwordHash: await hashPassword(password),
    });

    if (user) {
      res.render("pages/auth/login");
    } else {
      res.redirect("/auth/register");
    }
  }
}

module.exports = RegisterController;
