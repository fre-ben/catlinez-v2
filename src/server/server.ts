import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import type { CatGif, CurrentsNews, Headline } from "../types";
dotenv.config({ path: `.env.local` });

const TENOR_APIKEY = process.env.VITE_TENOR_API;
const CURRENTS_APIKEY = process.env.VITE_CURRENTS_API;

// HELPER FUNCTIONS
/**
 * Gets a random Headline from a news Object array
 * @param news
 * @returns Headline
 */
export function getRandomHeadline(news: CurrentsNews): Headline {
  const randomNews: typeof news.news[0] = news.news[Math.floor(Math.random() * news.news.length)];
  const headline = { title: randomNews.title, url: randomNews.url };

  return headline;
}

/**
 * Fetches news from Currents API by language param
 * @param language
 * @returns Promise<CurrentsNews>
 */
export async function fetchNews(language: string): Promise<CurrentsNews> {
  const news = await fetch(
    `https://api.currentsapi.services/v1/search?type=1&page_size=150&category=general&language=${language}&apiKey=${CURRENTS_APIKEY}`
  ).then((response) => {
    console.log("Daily calls to Currents API remaining: " + response.headers.get("X-RateLimit-Remaining"));
    return response.json();
  });

  return news as CurrentsNews;
}

/**
 * Fetches random cat gif from Tenor API
 * @returns Promise<CatGif>
 */
export async function fetchRandomCatGIF(): Promise<CatGif> {
  const result: any = await fetch(`https://g.tenor.com/v1/random?key=${TENOR_APIKEY}&q=cat&locale=en_US&limit=1`).then(
    (res) => res.json()
  );

  return {
    title: result.results[0].content_description,
    url: result.results[0].media[0].mediumgif.url,
    dims: result.results[0].media[0].mediumgif.dims,
  };
}

// SERVER LOGIC START
const app = express();

app.use(express.json());

app.get("/api/cat", async (req, res) => {
  if (req.method === "GET") {
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

app.get("/api/news/de", async (req, res) => {
  if (req.method === "GET") {
    try {
      const news = await fetchNews("de");

      console.log("Backend: news requested");

      return res.status(200).json(getRandomHeadline(news));
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

app.get("/api/news/en", async (req, res) => {
  if (req.method === "GET") {
    try {
      const news = await fetchNews("en");

      console.log("Backend: news requested");

      return res.status(200).json(getRandomHeadline(news));
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
