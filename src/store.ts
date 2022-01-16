import favoriteSlice from './features/favoriteSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice'
import productSlice from './features/productSlice'

const reducer = combineReducers({
    products: productSlice,
    cart: cartSlice,
    favorite: favoriteSlice
})

const store = configureStore({ reducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;