const express = require("express");
const { Sale } = require("../models/index");
const router = express.Router();
const upload = require("./uploadImage");
router.post("/", upload.single("photo"));

router.post("/", async (req, res, next) => {
  const newPost = req.body;
  newPost.userID = req.userID;
  newPost.photo = req.filename;
  console.log(req.body.price);
  newPost.price = parseInt(req.body.price);
  console.log(newPost);
  try {
    const result = await Sale.create(newPost);
    console.log(result);
    result.price = parseInt(result.price);
    res
      .status(201)
      .json({ success: true, documents: [result], message: "post 등록 성공" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.size) || 10;

  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  try {
    const result = await Sale.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });
    const totalPages = Math.ceil(result.count / pageSize);
    res.status(200).json({
      success: true,
      documents: result.rows,
      totalPages: totalPages,
      message: "sales 조회성공",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const options = {
    where: {
      id: id,
    },
  };
  try {
    const result = await Sale.findAll(options);
    res
      .status(200)
      .json({ success: true, documents: result, message: "sale 조회성공" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
