import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { client } from "@gradio/client";

const app = express();
const port = 8000;

const image_app = await client("https://atulit23-01.hf.space/");
const review_app = await client("https://atulit23-deceptive-rev.hf.space/");

app.use(bodyParser.json());
app.use(cors());

app.get("/image-prediction", async (req, res) => {
  const url = req.query;
  const result = await image_app.predict("/predict", [url.url]);
  res.send(result.data[0]);
});

app.get("/review-prediction", async (req, res) => {
  const url = req.query;
  const result = await review_app.predict("/predict", [url.url]);
  console.log(url)
  console.log(result)
  res.json(result.data[0]);
});

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
