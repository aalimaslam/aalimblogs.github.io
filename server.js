const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const blogRoutes = require("./blogRoutes");
const adminRoutes = require("./adminRoutes");
//Connecting Database to the server
//Listening to the request after the connection is Sucessfull
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => err);

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
app.post("/", (req, res) => {;
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

//admin routes

app.use("/25680/admin", adminRoutes)


//Blog Routes

app.use("/" , blogRoutes)


//About Route

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});



//404 Route

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
