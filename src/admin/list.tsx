import * as React from 'react';
import store from '../store';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ConfirmDialog from './common/confirmDialog';
import { useProductDispatch } from '../hooks/useProductDispatch';
import { removeProduct } from '../features/productSlice';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);

interface IList {
}
const List: React.FC<IList> = state => {
    const dispatch = useProductDispatch();
    const productStore = store.getState();
    const classes = useStyles();
    const [dialogIsOpen, setDialog] = React.useState(false)
    const [productIdToDelete, setProductIdToDelete] = React.useState('')
    const handleDel = (productId: string) => {
        setProductIdToDelete(productId)
        setDialog(true)
    }
    const handleDialogClose = (isConfirmed?: boolean) => {
        if (isConfirmed) {
            dispatch(removeProduct(productIdToDelete))
        }
        setProductIdToDelete('')
        setDialog(false)
    }

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell align="center">Цена</TableCell>
                        <TableCell align="center">Количество</TableCell>
                        <TableCell align="center">Описание</TableCell>
                        <TableCell align="center"> Полное описание</TableCell>
                        <TableCell align="center">Удалить</TableCell>
                        <TableCell align="center">Редакторовать</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productStore.products?.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell component="th" scope="row">
                                {product.name}
                            </TableCell>
                            <TableCell align="center">{product.price}{product.currency}</TableCell>
                            <TableCell align="center">{product.amount}</TableCell>
                            <TableCell align="center">{product.description}</TableCell>
                            <TableCell align="center">{product.fullDescription}</TableCell>
                            <TableCell align="center"><IconButton
                                color="secondary"
                                onClick={() => handleDel(product.id)}
                            >
                                <DeleteIcon />
                            </IconButton></TableCell>

                            <TableCell align="center"><IconButton
                                color="secondary"
                                component={Link} to={{
                                    pathname: `/admin/catalog/new/${product.id}`,
                                }}
                            >
                                <SettingsIcon />
                            </IconButton></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
        <ConfirmDialog isOpen={dialogIsOpen} onClose={handleDialogClose} />
    </>
}
export default List