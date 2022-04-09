import type { CatGif } from "../types";

// Gets Cat GIF from backend
// Called clientside
export async function getCatGIF(): Promise<CatGif> {
  const response = await fetch(`/api/cat`, { method: "GET" });
  const catGif = await response.json();

  if (response.ok) {
    return catGif;
  } else {
    throw new Error(catGif);
  }
}
