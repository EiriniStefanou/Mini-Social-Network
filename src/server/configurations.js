const path = require("path");
const express = require("express");
const ejsLayout = require("express-ejs-layouts");

class Configurations {
  /**
   *
   * @param {express.Application} app
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * Handle project configurations.
   *
   */
  configure() {
    this.layoutHandler();
    this.configureStaticAssets();
    this.setDefaultLayout();
    this.setViewEngine();
  }

  /**
   * Layout handler.
   *
   */
  layoutHandler() {
    this.app.use(ejsLayout);
  }

  /**
   * Set the static asset path.
   *
   */
  configureStaticAssets() {
    this.app.use(express.static(path.join(__dirname, "../../public")));
  }

  /**
   * Set the default layout for the application.
   *
   */
  setDefaultLayout() {
    this.app.set("layout", "./layouts/app.ejs");
  }

  /**
   * Set the view engine.
   *
   */
  setViewEngine() {
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "../views"));
  }
}

module.exports = Configurations;
