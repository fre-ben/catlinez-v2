export interface CatGif {
  title: string;
  url: string;
  dims: Number[];
}

export interface Headline {
  title: string;
  url: string;
}

export interface CurrentsNews {
  status: string;
  news: [
    {
      id: string;
      title: string;
      description: string;
      url: string;
      author: string;
      image: string;
      language: string;
      category: string[];
      published: string;
    },
  ];
  page: number;
}
