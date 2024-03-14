const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const UserModel = require("./models/Usermodel");
const PostModel = require("./models/Postmodel");

//code into json format
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//cookie handler
app.use(cookieParser());

//to access the public folder for image loading on frontend through server
app.use(express.static("public"));

//connection with database - mongodb
mongoose.connect("mongodb://localhost:27017/blogapp");

//creation of API for veryfing user
//next ad next() is use for sending back to the '/' route
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("The token is wrong");
      } else {
        req.email = decoded.email;
        req.username = decoded.username;
        next();
      }
    });
  }
};
//middleware -> authentication
app.get("/", verifyUser, (req, res) => {
  return res.json({ email: req.email, username: req.username });
});

//creation of API for registration
//create a user - regitser
app.post("/register", (req, res) => {
  //hashing of password
  const { username, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ username, email, password: hash })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err));
});

//creation of API for login
//create a user - login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, username: user.username },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json("Success");
        } else {
          return res.json("Password is incorrect");
        }
      });
    } else {
      return res.json("User not exist");
    }
  });
});

//store tthe file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb=call back method
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    //file.fieldname - name of file from frontend
    //Date.now() - Date
    //path.extname(file.originalname) - extension like png, jpg
  },
});

//upload file
const upload = multer({
  storage: storage,
});

//creation of API for posting post - check user login(verifyUser) --> upload file

app.post("/create", verifyUser, upload.single("file"), (req, res) => {
  //.single-only one file at a time
  //store record in mode
  PostModel.create({
    title: req.body.title,
    description: req.body.description,
    file: req.file.filename,
    email: req.body.email,
  })
    .then((result) => res.json("Success"))
    .catch((err) => res.json(err));
});

//creation of API for logout
app.get("/logout", (req, res) => {
  res.clearCookie("token"); //clear cookie
  return res.json("Success");
});

//creation of API for getting posts
app.get("/getposts", (req, res) => {
  PostModel.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

//creation of API for getting post by id
app.get("/getpostbyid/:id", (req, res) => {
  const id = req.params.id;
  PostModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

//creation of API for editing post by id
app.put("/editpost/:id", (req, res) => {
  const id = req.params.id;
  PostModel.findByIdAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then(() => res.json("Success"))
    .catch((err) => res.json(err));
});

//creation of API for deleting post by id
app.delete("/deletepost/:id", (req, res) => {
  PostModel.findByIdAndDelete({ _id: req.params.id })
    .then((result) => res.json("Success"))
    .catch((err) => res.json(err));
});

//run server
app.listen(3001, () => {
  console.log("Server is running");
});
