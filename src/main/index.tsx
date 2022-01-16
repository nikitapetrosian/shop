import * as React from 'react';
import { Route, Routes } from 'react-router';
import Cart from './cart';
import Catalog from './catalog';
import NavBar from './common/navBar';
import FavoritePage from './favoritePage';
import ProductPage from './productPage';
interface IMain {

}
const Main: React.FC<IMain> = () => {
    return <>
        <NavBar />
        <div className='container-fluid '>
            <Routes>
                <Route path="/*" element={<Catalog />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="favorite/" element={<FavoritePage />} />
                <Route path="cart/" element={<Cart />} />
            </Routes>
        </div>
    </>
}
export default Main