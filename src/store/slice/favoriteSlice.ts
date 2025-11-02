import type {  PayloadAction } from "@reduxjs/toolkit";
import  { createSlice } from "@reduxjs/toolkit";
import type { NewsArticle } from "../API/NewsApi";


interface FavoriteState {
    favorites: NewsArticle[];
}

const initialState: FavoriteState = {
    favorites: [],
};

const favoriteSlice = createSlice ({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<NewsArticle>) => {
            const exists = state.favorites.some(fav => fav.url === action.payload.url);
            if(!exists) {
                state.favorites.push(action.payload)
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(article => article.url !== action.payload)
        },
        toggleFavorites: (state, action: PayloadAction<NewsArticle>) => {
            const exists = state.favorites.some(fav => fav.url === action.payload.url);
            if(exists) {
                state.favorites = state.favorites.filter(artical => artical.url !== action.payload.url)
            } else {
                state.favorites.push(action.payload)
            }
        },
        clearFavorites: (state) => {
            state.favorites = [];
        }
    }
});


export const {
    addToFavorites,
    removeFromFavorites,
    toggleFavorites,
    clearFavorites,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;

