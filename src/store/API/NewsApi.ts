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
  const accessKey = "6904b03c346442b890b08010da2d12da"; // Поменял ключ для другого Апи

  // const offset = (page - 1) * pageSize;
  // API Key MediaStack "ef5031b2a50e0b92f80a621d6b3e0c22";
  // URL MediaStack ("http://api.mediastack.com/v1/news")
  //   url.searchParams.append("countries", "us,gb,de"); 40 -строка
  //   url.searchParams.append("keywords", query); 38 - строка
  //   url.searchParams.append("access_key", accessKey); 33- строка
  //   url.searchParams.append("offset", offset.toString());  38 - строка
  //  if (data.error) {
  //   throw new Error(data.error.message);  с 53 - 55 строка кода замена для newApi
  // }

  const url = new URL("https://newsapi.org/v2/everything"); // Тут поменял URL
  url.searchParams.append("apiKey", accessKey);
  url.searchParams.append("q", query);
  url.searchParams.append("pageSize", pageSize.toString());
  url.searchParams.append("limit", pageSize.toString());
  url.searchParams.append("languages", "en");

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error(
        `Invalid API response: articles not found. Response: ${JSON.stringify(
          data
        )}`
      );
    }
    // Вместо MediaStack
    const transformedData: NewsApiResponse = {
      data: data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage,
        published_at: article.publishedAt,
        source: article.source?.name || "Unknown",
      })),
      pagination: {
        limit: pageSize,
        offset: (page - 1) * pageSize,
        count: data.articles.length,
        total: data.totalResults || 0,
      },
    };

    return transformedData;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}
