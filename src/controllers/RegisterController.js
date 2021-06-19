const passport = require("passport");
const User = require("../models/User");
const Controller = require("./Controller");

const hashPassword = require("../helpers/hashPassword");
const Account = require("../models/Account");

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

    // Create the users account
    await Account.create({
      email,
      passwordHash: await hashPassword(password),
    });

    // Get the account that was created
    const account = await Account.findOne({ where: { email } });

    // Create the user model with the acccount
    const user = await User.create({
      name,
      surname,
      role: "user",
      accountId: account.id,
    });

    if (user) {
      res.render("pages/auth/login");
    } else {
      res.redirect("/auth/register");
    }
  }
}

module.exports = RegisterController;
