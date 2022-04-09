import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import type { CatGif, CurrentsNews } from "../types";
dotenv.config({ path: `.env.local` });

const app = express();

const TENOR_APIKEY = process.env.VITE_TENOR_API;
const CURRENTS_APIKEY = process.env.VITE_CURRENTS_API;

app.use(express.json());

app.get("/api/cat", async (req, res) => {
  if (req.method === "GET") {
    // Fetches random cat gif from Tenor API
    // Called serverside
    async function fetchRandomCatGIF(): Promise<CatGif> {
      const result: any = await fetch(
        `https://g.tenor.com/v1/random?key=${TENOR_APIKEY}&q=cat&locale=en_US&limit=1`
      ).then((res) => res.json());

      return {
        title: result.results[0].content_description,
        url: result.results[0].media[0].mediumgif.url,
        dims: result.results[0].media[0].mediumgif.dims,
      };
    }

    try {
      const randomCatGif = await fetchRandomCatGIF();

      console.log("Backend: cat requested");

      return res.status(200).json({
        ...randomCatGif,
      });
    } catch {
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
});

app.get("/api/news", async (req, res) => {
  if (req.method === "GET") {
    async function fetchNews(): Promise<CurrentsNews> {
      const news = await fetch(
        `https://api.currentsapi.services/v1/latest-news?category=general&language=de&apiKey=${CURRENTS_APIKEY}`
      ).then((response) => response.json());

      return news as CurrentsNews;
    }

    try {
      const news = await fetchNews();

      console.log("Backend: news requested");

      return res.status(200).json({
        ...news,
      });
    } catch {
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
});

app.use(express.static("dist/app"));

app.get("*", (_request, response) => {
  response.sendFile("index.html", {
    root: "dist/app",
  });
});

app.listen(3000, () => console.log(`Server listening on port 3000! See: http://localhost:3000/`));
