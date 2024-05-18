const express = require("express");
const cors = require("cors");
const dbStart = require("./database/mongo");
const dotenv = require("dotenv");
const User = require("./models/User");
const Repo = require("./models/Repo");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const checker = require("./scripts/dependencyCheck");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

var GitHubStrategy = require("passport-github2").Strategy;
var passport = require("passport");
const session = require("express-session");

dotenv.config();

const app = express();
const s3Client = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

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
app.use(
  cors({
    origin: "http://localhost:5173",
    method: "GET, PUT, POST, DELETE",
    credentials: true,
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
      console.log("refresh", refreshToken);
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
    res.redirect("http://localhost:5173");
  }
);

app.get("/my-repos", async (req, res) => {
  console.log(req?.session);
  try {
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
  } catch (error) {
    console.log(error);
  }
});

const uploadDirectory = async (directoryPath, bucketName, keyPrefix) => {
  const files = await readdir(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      await uploadDirectory(filePath, bucketName, `${keyPrefix}/${file}`);
    } else {
      const fileContent = fs.readFileSync(filePath);
      const uploadParams = {
        Bucket: bucketName,
        Key: `${keyPrefix}/${file}`,
        Body: fileContent,
      };

      try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        console.log(`Successfully uploaded ${filePath} to ${uploadParams.Key}`);
      } catch (err) {
        console.error(`Error uploading ${filePath}: ${err.message}`);
      }
    }
  }
};

app.post("/checkoutCode", async (req, res) => {
  const { repoUrl } = req.body;
  const username  = req.session?.passport.user.username;

  if (!repoUrl) {
    return res.status(400).send("Repository URL is required.");
  }

  const destinationFolder = path.join(__dirname, "dist");
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }
  const repoName = path.basename(repoUrl, ".git");
  const repoPath = path.join(destinationFolder, repoName);

  console.log(repoPath);

  // const username = req.session.passport.user.username;
  const user = await User.findOne({ username });
  let repo = await Repo.findOne({ url: repoUrl });
  console.log(user)
  if (!repo) {
    repo = await Repo.create({
      url: repoUrl,
      user: user._id,
      path: repoPath,
    });
  }

  const cloneCommand = `git clone ${repoUrl} ${repoPath}`;

  const slug = new Date().toISOString();

  console.log(slug);

  exec(cloneCommand, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error cloning repository: ${error.message}`);
      return res.status(500).send(`Error cloning repository: ${error.message}`);
    }
    if (stderr) {
      console.error(`Standard error: ${stderr}`);
    }

    try {
      await uploadDirectory(
        repoPath,
        process.env.BUCKET_NAME,
        `__outputs/${slug}`
      );
      console.log(`Successfully uploaded the repository to S3.`);
      res.status(200).json({ success: true, data: repo });
    } catch (uploadError) {
      console.error(`Error uploading directory: ${uploadError.message}`);
      return res
        .status(500)
        .send(`Error uploading directory: ${uploadError.message}`);
    }
  });
});

app.get("/run-analysis/:id", async (req, res) => {
  const { id } = req.params;
  const repo = await Repo.findById(id);

  console.log(repo);

  if (repo) {
    await checker(repo.path);
    res.status(200).json({ success: true });
  }
});

const convertToJSON = (input) => {
  const lines = input.trim().split("\n");
  const result = {};

  lines.forEach((line) => {
    const [package, cves] = line.split(":");
    result[package] = cves.split(",");
  });

  return result;
};
app.get('/synced-repos', async(req,res)=>{
    try{
      const username = req.session.passport.user.username;
      const user = await User.findOne({username})
      if(!user){
        return res.json({success:false})
      }
      const repos = await Repo.find({
        user:user._id
      })
      res.status(200).json({data:repos,success:true})
    }
    catch(err){
      res.status(500).json({
        success:false
      })
    }
})
app.get("/get-analysis", async (req, res) => {
  fs.readFile(__dirname + "/output.txt", "utf8", async (err, data) => {
    if (err) {
      console.log(err);
    }

    // fs.rmdirSync(__dirname, "/dist", {recursive: true});
    // fs.rmSync(__dirname, '/output.txt')

    return res.status(200).json({
      success: true,
      data: convertToJSON(data),
    });
  });


});

app.listen(port, () => console.log("Server is running at " + port));
