import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchNews } from "../../store/API/NewsApi";
import type { NewsArticle } from "../../store/API/NewsApi";

export default function DetailsNews() {
  const { id } = useParams(); 
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        const response = await fetchNews(1, 50, "future");
        const found = response.data.find((_, index) => index + 1 === Number(id)); // поиск по id
        setArticle(found || null);
      } catch (error) {
        console.error("Ошибка загрузки новости:", error);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
        <Link to="/newsPage" className="text-blue-600 hover:underline">
          Вернуться к списку новостей
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/newsPage"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Назад к новостям
      </Link>
      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {article.title}
        </h1>

        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-xl mb-6"
          />
        )}
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
          <span className="font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
            {article.source}
          </span>
          <span className="mx-3">•</span>
          <span>
            {new Date(article.published_at).toLocaleDateString("ru-RU")}
          </span>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            {article.description}
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Читать оригинал статьи
          </a>
        </div>
      </article>
    </div>
  );
}
