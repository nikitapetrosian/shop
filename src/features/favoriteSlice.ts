import { IProduct } from '../models/IProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string[] = []

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavoriteProduct: (state, action: PayloadAction<string>) => {
            state.push(action.payload)
        },
        removeFavoriteProduct: (state, action: PayloadAction<string>) => {
            return state.filter(productId => productId !== action.payload)
        },
        decrimentFavoriteProductCount: (state, action: PayloadAction<string>) => {
            const indexId = state.indexOf(action.payload)
            return state.slice(indexId, 1)
        },
    }
})

export const { addFavoriteProduct, removeFavoriteProduct, decrimentFavoriteProductCount } = favoriteSlice.actions

export default favoriteSlice.reducer