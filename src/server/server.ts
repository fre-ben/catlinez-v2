import "dotenv/config";
import express from "express";
import fetch from "node-fetch";

const app = express();
const TENOR_APIKEY = process.env.VITE_TENOR_APIKEY;

app.use(express.json());

app.get("/api/cat", async (req, res) => {
  if (req.method === "GET") {
    async function fetchRandomCatGIF() {
      const gif: any = await fetch(`https://g.tenor.com/v1/random?key=${TENOR_APIKEY}&q=cat&locale=en_US&limit=1`).then(
        (res) => res.json()
      );
      return await gif.results[0].media[0].mediumgif.url;
    }

    try {
      const randomCatGif = await fetchRandomCatGIF();

      console.log("Backend: cat requested");

      return res.status(200).json({ url: randomCatGif });
    } catch {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
});

app.use(express.static("dist/app"));

app.get("*", (_request, response) => {
  response.sendFile("index.html", { root: "dist/app" });
});

app.listen(3000, () => console.log(`Server listening on port 3000! See: http://localhost:3000/`));