export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string | null;
  published_at: string;
  source: string;
}

export interface NewsApiResponse {
  data: NewsArticle[];
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
}

export async function fetchNews(
  page: number = 1,
  pageSize: number = 9,
  query: string = "Future"
): Promise<NewsApiResponse> {
  const accessKey = "ef5031b2a50e0b92f80a621d6b3e0c22";
  const offset = (page - 1) * pageSize;

  const url = new URL("http://api.mediastack.com/v1/news");
  url.searchParams.append("access_key", accessKey);
  url.searchParams.append("keywords", query);
  url.searchParams.append("countries", "us,gb,de");
  url.searchParams.append("limit", pageSize.toString());
  url.searchParams.append("offset", offset.toString());
  url.searchParams.append("languages", "en");

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}
