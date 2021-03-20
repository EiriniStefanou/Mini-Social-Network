const express = require("express");
const app = express();
const ServerContainer = require("./server/index");

const server = new ServerContainer(app, 7000);

const WelcomeController = require("./controllers/WelcomeController");
const LoginController = require("./controllers/LoginController");

const controllers = [new WelcomeController(), new LoginController()];

Promise.resolve().then(() => {
  server.loadControllers(controllers);
  server.initializeServer();
});
