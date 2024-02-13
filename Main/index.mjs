import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { client } from "@gradio/client";

const app = express();
const port = 8000;

const image_app = await client("https://atulit23-01.hf.space/");
const flan_app = await client("https://atulit23-google-flan-t5.hf.space/");
const image_app_1 = await client("https://atulit23-ui-deception.hf.space/");
const review_app = await client("https://atulit23-deceptive-rev.hf.space/");

app.use(bodyParser.json());
app.use(cors());

app.get("/image-prediction", async (req, res) => {
  const url = req.query;
  const result = await image_app_1.predict("/predict", [url.url]);
  res.send(result.data[0]);
});

app.get("/review-prediction", async (req, res) => {
  const url = req.query;
  const result = await review_app.predict("/predict", [url.url]);
  console.log(JSON.parse(result.data[0]))
  res.json(JSON.parse(result.data[0]));
});

app.get("/text-interference", async (req, res) => {
  const text = req.query;
  const result = await flan_app.predict("/predict", [text.text]);
  res.send(result.data[0]);
});

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
