const express = require("express");
const Controller = require("./Controller");

class WelcomeController extends Controller {
  constructor() {
    super();
  }

  path = "/";

  routes = [
    {
      path: "/",
      method: "GET",
      handler: this.handleWelcomePage,
      localMiddlewares: [],
    },
  ];

  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  handleWelcomePage(req, res) {
    res.render("pages/welcome");
  }
}

module.exports = WelcomeController;
