const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.send(posts);
  } catch (error) {
    console.error(error);
    res.send(500).json({ message: error.message });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.send(post);
  } catch (error) {
    console.error(error);
    res.send(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.send(post);
  } catch (error) {
    console.error(error);
    res.send(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.send(post);
  } catch (error) {
    console.error(error);
    res.send(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.send(500).json({ message: error.message });
  }
};
