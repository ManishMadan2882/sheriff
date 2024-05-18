const express = require("express");
const cors = require("cors");
const dbStart = require("./database/mongo");
const dotenv = require("dotenv");
const User = require("./models/User");

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
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.authenticate("session"));

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `/auth/github/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      console.log(profile);

      //   const res = await fetch(
      //     `https://api.github.com/users/${profile.username}/repos`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //       },
      //     }
      //   );
      //   const data = await res.json();
      const user = await User.findOne({ username: profile.username });
      console.log(user);
      console.log(profile.username);

      if (!user) {
        console.log("Adding new github user to DB..");
        const user = new User({
          id: profile.id,
          username: profile.username,
          provider: profile.provider,
          avatar: profile.photos[0].value,
          bio: profile._json.bio,
          Name: profile.displayName,
          numOfRepos: profile._json.public_repos,
          profileUrl: profile.profileUrl,
          refreshToken: refreshToken,
          accessToken,
        });
        await user.save();
        return done(null, user);
      } else {
        console.log("Github user already exist in DB..");
        return done(null, profile);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use(express.json());

dbStart(connectionUrl);

app.get("/", (req, res) => {
  res.json("healthy");
});

app.get("/fail", (req, res) => {
  res.send("fail");
});

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email", "user", "repo"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/fail" }),
  function (req, res) {
    res.redirect("/success");
  }
);

app.get("/success", async (req, res) => {
  console.log(req.session);
  const username = req.session.passport.user.username;
  const user = await User.findOne({ username: username });

  if (user) {
    console.log;
    const result = await fetch(
      `https://api.github.com/users/${user.username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    const data = await result.json();
    console.log(data);
    return res.status(200).json({ data: data });
  }
  return res.status(404).json("Error");
});

app.listen(port, () => console.log("Server is running at " + port));
