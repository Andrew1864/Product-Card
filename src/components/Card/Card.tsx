interface CardProps {
  id: number;
  title: string;
  description: string;
  img: string | null;
  isFavorite: boolean;
}

export default function Card({
  id,
  title,
  description,
  img,
  isFavorite,
}: CardProps) {
  return (
    <div className="w-full mb-3 max-w-sm bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
      <div className="relative">
        {img ? (
          <img
            className="w-full h-48 object-cover rounded-t-3xl"
            src={img}
            alt={title}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-t-3xl flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <button
          className={`absolute top-0 right-0 m-2 p-2 rounded-full z-10 ${
            isFavorite
              ? "text-red-500 bg-white"
              : "text-white bg-black bg-opacity-50"
          }`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <a
            href="#"
            className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none rounded-3xl focus:ring-blue-300 font-medium text-lg w-40 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
          >
            Посмотреть
          </a>
        </div>
      </div>
    </div>
  );
}
