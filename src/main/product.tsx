import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IProduct } from '../models/IProduct';
import { useCartDispatch } from '../hooks/useCartDispatch copy';
import { addProduct } from '../features/cartSlice';
import ConfirmDialog from './common/confirmDialog';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { addFavoriteProduct, removeFavoriteProduct } from '../features/favoriteSlice';
import store from '../store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '30%',
            padding: '1rem',
            marginTop: '1rem',
            height: '30rem',
            position: 'relative'
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        avatar: {
            backgroundColor: red[500],
        },
        action: { position: 'absolute', bottom: '0' },
        favoriteActive: {
            color: 'red'
        }
    }),
);

const Product: React.FC<IProduct> = (props) => {
    const dispatch = useCartDispatch()
    const classes = useStyles();
    const productStore = store.getState().favorite
    const [isFavorite, setFaforite] = useState(false)
    const hanleAdd = (id: string) => {
        dispatch(addProduct(id))
    }
    const hanleFavoriteAdd = (id: string) => {
        if (productStore.includes(id)) {
            dispatch(removeFavoriteProduct(id))
        }
        else {
            dispatch(addFavoriteProduct(id))
        }
        setFaforite(!isFavorite)
    }

    const [dialogIsOpen, setDialog] = React.useState(false)
    const [productIdInfo, setProductIdInfo] = React.useState('')
    const handleOpen = (productId: string) => {
        setProductIdInfo(productId)
        setDialog(true)
    }
    const handleDialogClose = (isConfirmed?: boolean,) => {
        setProductIdInfo('')
        setDialog(false)
    }

    return (<>
        <Card className={classes.root}>
            <Link
                to={`/product/${props.id}`}
                component={RouterLink}
                color="inherit"
            >
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {props.name.split('', 1)}
                        </Avatar>
                    }
                    title={props.name}
                    subheader={props.price + props.currency}
                />
                <CardMedia
                    className={classes.media}
                    image="http://placekitten.com/200/300"
                    title={props.name}
                />
            </Link>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}<br />
                    {props.amount} штук
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.action}>
                <IconButton
                    aria-label="add to favorites"
                    onClick={() => hanleFavoriteAdd(props.id)}
                >
                    <FavoriteIcon className={isFavorite ? classes.favoriteActive : ''} />
                </IconButton>
                <IconButton
                    aria-label="share"
                    onClick={() => hanleAdd(props.id)}
                >
                    <AddShoppingCartIcon />
                </IconButton>
                <IconButton
                    onClick={() => handleOpen(props.id)}
                >
                    <VisibilityIcon />
                </IconButton>
            </CardActions>
        </Card>
        <ConfirmDialog isOpen={dialogIsOpen} onClose={handleDialogClose} id={productIdInfo} />
    </>
    );
};

export default Product;