import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import store from '../../store';

interface IConfirmDialog {
    isOpen: boolean,
    onClose: (isConfirmed?: boolean) => void,
    id: string
}
const ConfirmDialog: React.FC<IConfirmDialog> = (props) => {
    const productStore = store.getState();
    const handleClose = (isConfirmed?: boolean) => {
        props.onClose(isConfirmed)
    }
    const productById = productStore.products.find((el) => el.id === props.id)

    return (
        <Dialog
            open={props.isOpen}
            onClose={() => handleClose()}
            id={props.id}
        >
            <DialogTitle>{productById?.name}</DialogTitle>
            <DialogContent>
                <DialogContentText >
                    {productById?.fullDescription}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="primary" >
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ConfirmDialog