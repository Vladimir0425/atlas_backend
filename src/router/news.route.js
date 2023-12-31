import { Router } from "express";
import model from "../model/news.model";
import upload from "../upload";
import csv from "csv-express"
const router = Router();

router.get("/", async (req, res) => {
  if (req.query.latest == true) {
    res.send(await model.find().sort({ created_at: -1 }).limit(3));
  } else {
    res.send(await model.find());
  }
});
router.post("/", async (req, res) => {
  res.send(await model.create({ ...req.body, created_at: new Date() }));
});

router.post("/image", upload.array("files"), async (req, res) => {
  let body = { files: [] };
  for (let file of req.files) {
    body.files.push(file.path);
  }
  res.send(await model.findByIdAndUpdate(req.query.id, body, {new: true}));
});
router.get("/file", async (req, res) => {
  let a = await model.find({});
  a = JSON.parse(JSON.stringify(a));
  res.csv(a, true);
});

export default router;
