const express = require("express");
const router = express.Router();
const Blog = require("./models/blog");

router.get("/create-blog", (req, res) => {
  res.render("create", { title: "Create" });
});

router.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    res.render("blog", { title: "Blog", result });
  });
});

router.delete("/blog/:id", (req, res) => {
  console.log("request to delete");
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
  .then((result) => {
    res.json({ redirect: "/25680/admin/posts" });
  });
});

module.exports = router;
