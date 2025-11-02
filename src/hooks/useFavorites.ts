import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/slice/storeSlice";
import {
  addToFavorites,
  removeFromFavorites,
  toggleFavorites,
  clearFavorites,
} from "../store/slice/favoriteSlice";
import type { NewsArticle } from "../store/API/NewsApi";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  return {
    favorites,
    addToFavorites: (article: NewsArticle) => dispatch(addToFavorites(article)),
    removeFromFavorites: (url: string) => dispatch(removeFromFavorites(url)),
    toggleFavorites: (article: NewsArticle) =>
      dispatch(toggleFavorites(article)),
    clearFavorites: () => dispatch(clearFavorites()),
    isFavorite: (url: string) =>
      favorites.some((article: NewsArticle) => article.url === url),
    favoriteCount: favorites.length,
  };
};
