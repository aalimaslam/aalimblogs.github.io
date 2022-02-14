const express = require("express");
const router = express.Router();
const Blog = require("./models/blog")



router.get("/", (req,res)=>{
    res.render("adminHome")
})
router.get("/posts", (req,res)=>{
    Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("adminPosts" , {result})
    });
})
router.get("/settings", (req,res)=>{
    res.render("adminSettings" , {blog: Blog})
})


module.exports = router