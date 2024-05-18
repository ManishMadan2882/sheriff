const express = require("express");
const cors = require("cors");
const dbStart = require("./database/mongo");
const dotenv = require("dotenv");
var GitHubStrategy = require("passport-github2").Strategy;
var passport = require("passport");
const session = require("express-session");

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const connectionUrl = process.env.dbUrl;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

app.use(
  session({
    secret: process.env.COOKIE_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("hello");
      console.log(accessToken);
      console.log(profile);

      const res = await fetch(
        `https://api.github.com/users/${profile.login}/repos`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();
      //   console.log(data);
      //   const primaryEmail = data.find((item) => item.primary === true);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
app.use(passport.initialize());
app.use(passport.authenticate("session"));

app.use(express.json());
app.use(cors());

dbStart(connectionUrl);

app.get("/", (req, res) => {
  res.json("healthy");
});

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email", "user", "repo"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.listen(port, () => console.log("Server is running at " + port));
