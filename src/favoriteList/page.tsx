import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useFavorites } from "../hooks/useFavorites";
import Card from "../components/Card/Card";
import type { NewsArticle } from "../store/API/NewsApi"; 

export default function FavoriteList() {
    const { favorites, favoriteCount, removeFromFavorites  } = useFavorites();

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to='/newsPage'>
            <ArrowBackOutlinedIcon />
            </Link>
            <h1 className="text-4xl font-bold text-center mb-8">Избранные новости:</h1>
            <div className="text-center mb-8">
                <p className="text-gray-600 text-lg">
                    Всего избранных новостей: <span className="font-semibold text-blue-600">{favoriteCount}</span>
                </p>
            </div>
            {favoriteCount === 0 ? (
                <div className="text-center text-gray-500 py-16">
                    <p className="text-xl mb-2">Нет избранных новостей</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((article: NewsArticle) => ( 
                        <Card
                            key={article.url}
                            article={article}
                            onRemove={removeFromFavorites}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}