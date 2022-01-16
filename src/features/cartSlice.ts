import { IProduct } from '../models/IProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string[] = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<string>) => {
            state.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            return state.filter(productId => productId !== action.payload)
        },
        decrimentProductCount: (state, action: PayloadAction<string>) => {
            const indexId = state.indexOf(action.payload)
            return state.slice(indexId, 1)
        },
    }
})

export const { addProduct, removeProduct, decrimentProductCount } = cartSlice.actions

export default cartSlice.reducer