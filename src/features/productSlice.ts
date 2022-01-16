import { IProduct } from '../models/IProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import mock from '../mock/products.json'

const initialState: IProduct[] = mock

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.push({ ...action.payload, id: uuidv4() })
        },
        editProduct: (state, action: PayloadAction<IProduct>) => {
            return state.map(
                (product) => product.id === action.payload.id ?
                    action.payload
                    : product
            )
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            return state.filter(product => product.id !== action.payload)
        },
    }
})

export const { addProduct, removeProduct, editProduct } = productsSlice.actions

export default productsSlice.reducer