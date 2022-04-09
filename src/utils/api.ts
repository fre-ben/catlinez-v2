import type { CatGif, Headline } from "../types";

/**
 * Gets Cat GIF from backend
 * @returns Promise<CatGif>
 */
export async function getCatGIF(): Promise<CatGif> {
  const response = await fetch(`/api/cat`, { method: "GET" });
  const catGif = await response.json();

  if (response.ok) {
    return catGif;
  } else {
    throw new Error(catGif);
  }
}

/**
 * Gets Headline from backend
 * @returns Promise<Headline>
 */
export async function getHeadline(language: string): Promise<Headline> {
  const response = await fetch(`/api/news/${language}`, { method: "GET" });
  const headline = await response.json();

  if (response.ok) {
    return headline;
  } else {
    throw new Error(headline);
  }
}
