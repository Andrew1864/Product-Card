import { useFavorites } from "../../hooks/useFavorites";
import type { NewsArticle } from "../../store/API/NewsApi";

interface CardProps {
  article: NewsArticle;
  onRemove: (url: string) => void;
}

export default function Card({ article, onRemove }: CardProps) {
  const { toggleFavorites, isFavorite } = useFavorites();
  const favorites = isFavorite(article.url);

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFavorites(article);
  };

  const handleRemoveClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onRemove(article.url);
  };

  return (
    <div className="w-full mb-3 max-w-sm bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer flex flex-col h-full">
      <div className="relative flex-shrink-0">
        {article.image ? (
          <img
            className="w-full h-48 object-cover rounded-t-3xl"
            src={article.image}
            alt={article.title}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-t-3xl flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-0 right-0 m-2 p-2 rounded-full z-10 transition-colors ${
            favorites
              ? "text-red-500 bg-white"
              : "text-white bg-black bg-opacity-50 hover:bg-opacity-70"
          }`}
        >
          {favorites ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="px-5 py-4 flex-1 flex flex-col">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
          {article.title}
        </h5>
        <p className="text-gray-600 text-sm line-clamp-3 flex-1">
          {article.description || "No description available"}
        </p>
      </div>
      <div className="px-5 pb-5 pt-4 mt-auto">
        <div className="flex justify-center">
          <button
            className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none rounded-3xl focus:ring-blue-300 font-medium text-lg w-40 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
            onClick={handleRemoveClick}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
