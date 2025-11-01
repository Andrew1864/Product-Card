import { useState, useEffect } from "react";
import { fetchNews } from "../store/API/NewsApi";
import type { NewsArticle } from "../store/API/NewsApi";

export const useNews = (page: number = 1) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchNews(page, 9, 'future');

        setNews((prevNews) =>
          page === 1 ? response.data : [...prevNews, ...response.data]
        );

        setHasMore(response.data.length > 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, [page]);
  return { news, loading, error, hasMore };
};
