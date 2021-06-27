// Admin
const DashboardController = require("./Admin/DashboardController");
const UserController = require("./Admin/UserController");

// Application wide
const WelcomeController = require("./WelcomeController");
const LoginController = require("./LoginController");
const PostController = require("./PostController");
const RegisterController = require("./RegisterController");
const ProfileController = require("./ProfileController");
const LogoutController = require("./LogoutController");
const ProfilePostsController = require("./ProfilePostsController");
const SearchController = require("./SearchController");
const ReactionController = require("./ReactionController");

const controllers = [
  new WelcomeController(),
  new LoginController(),
  new PostController(),
  new RegisterController(),
  new ProfileController(),
  new LogoutController(),
  new ProfilePostsController(),
  new SearchController(),
  new ReactionController(),
  // Admin
  new DashboardController(),
  new UserController(),
];

module.exports = controllers;
