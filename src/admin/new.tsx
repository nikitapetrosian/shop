import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm, Controller } from "react-hook-form";
import { IProduct } from '../models/IProduct';
import { useProductDispatch } from '../hooks/useProductDispatch'
import { useNavigate, useParams } from 'react-router-dom';
import store from '../store';
import { addProduct, editProduct } from '../features/productSlice';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'rub',
        label: 'RUB',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));
interface INew {

}
const New: React.FC<INew> = () => {
    const navigate = useNavigate();
    const { id } = useParams()

    const dispatch = useProductDispatch();
    const { control, handleSubmit, reset } = useForm({
        defaultValues:
        {
            name: '',
            price: 0,
            currency: 'rub',
            amount: 1,
            description: '',
            fullDescription: '',
        }
    });

    React.useEffect(() => {
        if (id) {
            const products = store.getState().products
            const editProd = products.filter(p => p.id === id)[0]
            reset(editProd)
        }
    }, [id, reset])

    const onSubmit = (data: IProduct) => {
        if (id) {
            dispatch(editProduct(data))
        } else {
            dispatch(addProduct(data))
        }

        navigate('/admin/catalog/list')
    };


    const classes = useStyles();

    return <>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.root}
            noValidate
            autoComplete="off">
            <div>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <TextField label="Название" type="text"  {...field} />}
                />
                <div className='d-flex'>
                    <Controller
                        name="currency"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                select
                                label="Валюта"
                                helperText="Выберите валюту"
                                {...field}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }

                    />
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => <TextField label="Цена" type="number"  {...field} />}
                    />
                </div>
                <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => <TextField label="Количество" type="number"  {...field} InputLabelProps={{
                        shrink: true,
                    }} />}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <TextField label="Описание" type="text"  {...field} />}
                />
                <Controller
                    name="fullDescription"
                    control={control}
                    render={({ field }) => <TextField label="Полное описание" type="text"  {...field} />}
                />
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
            </div>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                type='submit'
            >
                Сохранить
            </Button>
        </form>
    </>
}

export default New