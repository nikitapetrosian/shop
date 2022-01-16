import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import store from '../store';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useCartDispatch } from '../hooks/useCartDispatch copy';
import { addProduct } from '../features/cartSlice';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addFavoriteProduct } from '../features/favoriteSlice';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            paddingLeft: '5rem',
            paddingTop: '2rem'
        },
        content: {
            display: 'flex',
            paddingRight: '5rem'
        },
        leftBlock: {
            marginRight: '2rem'
        },
        image: {
            width: '350px',
            height: '250px'
        },
        rightBlock: {

        },
        price: {

        },
        imageMini: {
            width: '150px',
            height: '100px'
        },
        action: {
            display: 'flex',
            backgroundColor: '#cee1f1'
        },
        button: {
            transform: ' translateY(40px)',
            marginLeft: '2rem'
        },
        AddShoppingCartIcon: {
            marginLeft: '1rem',
            fontSize: '40px'
        }
    }),
);
interface IProductPage { }

const ProductPage: React.FC<IProductPage> = () => {
    const dispatch = useCartDispatch()
    const classes = useStyles();
    const hanleAdd = (id: string) => {
        dispatch(addProduct(id))
    }
    const hanleFavoriteAdd = (id: string) => {
        dispatch(addFavoriteProduct(id))
    }
    const { id } = useParams()
    const productById = store.getState().products.filter((p) => p.id === id)[0]
    console.log(productById);

    return (
        <div className={classes.root}>
            <div>
                <h1>
                    {productById.name}
                </h1>
            </div>
            <div className={classes.content}>
                <div className={classes.leftBlock} >
                    <img src={productById.image} className={classes.image} />
                </div>
                <div className={classes.rightBlock}>
                    <div>
                        {productById.description}
                    </div>
                    <hr />
                    <div className={classes.action}>
                        <div className={classes.price}>
                            {productById.price}{productById.currency} <br />
                            <img src={productById.image} className={classes.imageMini} /><br />
                            {productById.amount} шт. в магазине
                        </div>
                        <div className={classes.button}>
                            <IconButton
                                onClick={() => hanleAdd(productById.id)}
                            >
                                Купить <AddShoppingCartIcon className={classes.AddShoppingCartIcon} />
                            </IconButton>
                            <IconButton
                                aria-label="add to favorites"
                                onClick={() => hanleFavoriteAdd(productById.id)}
                            >
                                Добавить в избранное<FavoriteIcon className={classes.AddShoppingCartIcon} />
                            </IconButton>
                        </div>
                    </div>
                    <hr />
                    <div>
                        {productById.fullDescription}
                    </div>
                </div>

            </div>


        </div>
    )
};

export default ProductPage;