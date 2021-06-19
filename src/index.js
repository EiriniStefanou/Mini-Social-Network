const express = require("express");
const app = express();
const session = require("express-session");
const ServerContainer = require("./server");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const server = new ServerContainer(app, 7000);

const WelcomeController = require("./controllers/WelcomeController");
const LoginController = require("./controllers/LoginController");
const PostController = require("./controllers/PostController");
const RegisterController = require("./controllers/RegisterController");
const ProfileController = require("./controllers/ProfileController");

const Account = require("./models/Account");

const controllers = [
  new WelcomeController(),
  new LoginController(),
  new PostController(),
  new RegisterController(),
  new ProfileController(),
];

app.use(
  session({
    //secret: process.env.SECRET,
    secret: "some secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (username, password, done) {
      const user = await Account.findOne({
        where: {
          email: username,
        },
      });

      if (user) {
        done(null, user);
      }

      if (!user) {
        done(null, false);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  const user = await Account.findOne({
    where: {
      id: id,
    },
  });

  if (user) {
    cb(null, user);
  }

  if (!user) {
    cb(null, false);
  }
});

Promise.resolve().then(() => {
  // try to connect to db
  server.loadControllers(controllers);
  server.initializeServer();
});
