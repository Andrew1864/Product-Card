import { useState } from "react";
import { useNews } from "../hooks/useNews";
import Card from "../components/Card/Card";

export default function NewsPage() {
  const [page, setPage] = useState(1);

  const { news, loading, error, hasMore } = useNews(page);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Новости</h1>
      {loading && page === 1 && (
        <div className="text-center text-gray-600 mb-6">
          Loading news about future technologies...
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {news.map((article, index) => (
          <Card key={`${article.url}-${index}`} article={article} />
        ))}
      </div>
      {!loading && news.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p className="text-xl mb-2">
            No news found about future technologies
          </p>
          <p className="text-sm">
            Try refreshing the page or check your internet connection
          </p>
        </div>
      )}
      {hasMore && news.length > 0 && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 transition-colors"
          >
            {loading ? "Loading..." : "Смотреть еще"}
          </button>
        </div>
      )}
      {!hasMore && news.length > 0 && (
        <p className="text-center text-gray-500 py-4">No more news to load</p>
      )}
    </div>
  );
}
