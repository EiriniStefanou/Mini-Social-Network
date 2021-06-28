const express = require("express");
const app = express();
const session = require("express-session");
const ServerContainer = require("./server");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const controllers = require("./controllers");
const Account = require("./models/Account");
const server = new ServerContainer(app, 7000);

app.use(
  session({
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
        done(null, false, { errors: [{ message: "user not found" }] });
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
  server.loadControllers(controllers);
  server.initializeServer();
});
