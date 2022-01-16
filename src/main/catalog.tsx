import React from 'react';
import store from '../store';
import TitlebarImageList from './imageList';
import Product from './product';
import SwipeableTextMobileStepper from './slider';

interface ICatalog { }
const Catalog: React.FC<ICatalog> = () => {
    const productStore = store.getState();

    return (
        <>
            <div className='container-fluid d-flex flex-column p-5'>
                <div className='container-fluid d-flex '>
                    <SwipeableTextMobileStepper />
                    <TitlebarImageList />
                </div>
                <div className='d-flex'>
                    {productStore.products?.map((product) =>
                        <Product key={product.id} {...product} />
                    )}
                </div >
            </div>
        </>
    )
};

export default Catalog;