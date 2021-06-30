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
      res.render("pages/auth/register", {
        user: null,
        auth: false,
        errors: [],
      });
    }
  }

  async register(req, res) {
    const { email, name, surname, password } = req.body;
    let errors = [];
    const emailExists = await Account.findOne({
      where: {
        email,
      },
    });

    const usernameExists = await User.findOne({
      where: {
        name,
      },
    });

    if (emailExists || usernameExists) {
      console.log(emailExists, usernameExists);
      res.redirect("/auth/register");

      return;
    }

    // Create the user's account
    await Account.create({
      email,
      passwordHash: await hashPassword(password),
    }).catch((err) => {
      err.errors.forEach((error) => {
        errors.push(error.message);
      });
    });

    // Get the account that was created
    const account = await Account.findOne({ where: { email } }).catch((err) => {
      err.errors.forEach((error) => {
        errors.push(error.message);
      });
    });

    // Create the user model with the acccount
    const user = await User.create({
      name,
      surname,
      role: "user",
      accountId: account.id,
    }).catch((err) => {
      err.errors.forEach((error) => {
        errors.push(error.message);
      });
    });

    if (errors.length > 0) {
      res.render("pages/auth/register", {
        user: null,
        auth: false,
        errors: errors,
      });

      return;
    }

    if (user) {
      res.redirect("/login");
    } else {
      res.redirect("/auth/register");
    }
  }
}

module.exports = RegisterController;
