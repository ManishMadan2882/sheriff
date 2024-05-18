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

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false, maxAge: 24*60*60*1000}
}))

app.use(passport.initialize());
app.use(passport.authenticate("session"));

/* passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
}); */

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
 
      const res = await fetch(
        `https://api.github.com/users/${profile.username}/repos`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();
      console.log(res)
      console.log("^^^^^",res.data)
      console.log(data)
      done(null,profile);
      //   console.log(data);
      //   const primaryEmail = data.find((item) => item.primary === true);
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
  function(req,res){
    res.redirect("/success")
  }
  
);

app.get("/success",(req,res,next)=>{
 res.status(200).json("Working")

})

app.listen(port, () => console.log("Server is running at " + port));
