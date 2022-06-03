import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
} from '@mui/material';

BaseDialog.propTypes = {
    close: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    render: PropTypes.node,
    title: PropTypes.string,
    maxWidth: PropTypes.oneOfType(
        [PropTypes.bool, PropTypes.string]
    )
};

export default function BaseDialog({ close, render, isOpen, title, maxWidth }) {

    return (
        <Dialog open={isOpen} onClose={close} scroll='body' fullWidth maxWidth={maxWidth}
        >
            <DialogTitle sx={{ textAlign: 'center' }} >{title}</DialogTitle>
            {render}
        </Dialog>
    );
}