const express = require("express");
const res = require("express/lib/response");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blog");
//Connecting Database to the server
//Listening to the request after the connection is Sucessfull
const port = process.env.PORT || 5000
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port);

  }).catch(err => err);

//setting view engine as ejs
app.set("view engine", "ejs");

//To use the data comning from create page
// attaches body property to the request object
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Home", result, id: 1 });
    });
});

//adding data to database

app.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});


app.get("/create-blog", (req, res) => {
  res.render("create", { title: "Create" });
});
app.get("/blog/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then(result=>{
        res.render("blog", { title: "Blog" , result});
    })
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog Routes

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// const blog = new Blog({
//     name: "aalim",
//     title : "hi",
//     body: "hello i am aalim aslam bhatt"
// })
// blog.save()
// .then((result)=>{
//     res.send(result)
// })
