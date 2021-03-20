const express = require("express");

class Controller {
  router = express.Router();

  setupRoutes() {
    for (const route of this.routes) {
      for (const middleware of route.localMiddlewares) {
        this.router.use(route.path, middleware);
      }

      switch (route.method) {
        case "GET":
          this.router.get(route.path, route.handler);
          break;

        case "POST":
          this.router.post(route.path, route.handler);
          break;

        case "PUT":
          this.router.put(route.path, route.handler);
          break;

        case "DELETE":
          this.router.delete(route.path, route.handler);
          break;
        default:
      }
    }
    return this.router;
  }
}

module.exports = Controller;
