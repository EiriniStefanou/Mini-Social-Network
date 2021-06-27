const helmet = require("helmet");
const express = require("express");
const ServerConfiguration = require("./configurations");

class Server extends ServerConfiguration {
  constructor(app, port) {
    super(app);
    this.app = app;
    this.port = port;

    this.configure();
    this.globalMiddlewares();
  }

  globalMiddlewares() {
    this.app.use(helmet());
  }

  loadControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.setupRoutes());
    });
  }

  initializeServer() {
    this.app.get("*", (req, res) => {
      if (req.isAuthenticated()) {
        res.redirect("/");
      } else {
        res.redirect("/auth/login");
      }
    });

    return this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
