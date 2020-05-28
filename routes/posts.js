const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const upload = require("../middleware/upload");
const Post = require("../models/Posts");
const Grid = require("gridfs-stream");
const config = require("config");
const db = config.get("mongoURL");
const mongoose = require("mongoose");

//gridfs connection
const conn = mongoose.createConnection(db);
let gfs;

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "SemsbookStore",
  });
  console.log("GridFS Connection Successful");
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({
      post: req.posts,
    });

    res.json(posts);
  } catch (err) {
    console.log("err", err);

    res.status(500).send(err);
  }
});

// @route    GET api/posts
// @desc      Get all posts.
// @access    Private
router.get("/:filename", (req, res) => {
  try {
    gfs
      .find({
        filename: req.params.filename,
      })
      .toArray((err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: "No file exists",
          });
        }
        // Check if image
        if (
          file[0].contentType === "image/jpeg" ||
          file[0].contentType === "image/png"
        ) {
          // Read output to browser

          const readstream = gfs.openDownloadStreamByName(req.params.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: "Not an image",
          });
        }
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

// @route    POST api/posts
// @desc      Get all posts.
// @access    Private
router.post("/", upload, async (req, res) => {
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  };
  const { title, country, context, creator, date } = req.body;
  try {
    const newPost = new Post({
      url: "/api/posts/" + req.file.filename,
      filename: req.file.filename,
      title,
      country,
      context,
      creator,
      date,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error..");
  }
});

// @route     DELETE  api/posts/:id
// @desc      Delete post
// @access    Private
// delete function to remove the file from the database

router.delete("/d/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    let obj_id;

    if (!post)
      return res.status(404).json({
        msg: "Post not found",
      });

    gfs
      .find({
        filename: post.filename,
      })
      .toArray((err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: "No file exists",
          });
        }
        // Check if image
        if (
          file[0].contentType === "image/jpeg" ||
          file[0].contentType === "image/png"
        ) {
          obj_id = new mongoose.Types.ObjectId(file[0]._id);
        } else {
          res.status(404).json({
            err: "Not a image ",
          });
        }
      });
    await Post.findOneAndRemove({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });

    await gfs.delete(obj_id);

    //middleware

    res.json({
      msg: "Post removed" + req.params.id,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
