const helmet = require("helmet");
const express = require("express");
const ServerConfiguration = require("./configurations");

class Server extends ServerConfiguration {
  /**
   *
   * @param {express.Application} app
   * @param {number} port
   */
  constructor(app, port) {
    super(app);
    this.app = app;
    this.port = port;

    this.configure();
    this.globalMiddlewares();
  }

  /**
   * Setup application wide middlewares.
   *
   */
  globalMiddlewares() {
    this.app.use(helmet());
  }

  /**
   * Load application controllers.
   *
   * @param {array} controllers
   */
  loadControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.setupRoutes());
    });
  }

  /**
   * Initialize the server.
   *
   */
  initializeServer() {
    return this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
