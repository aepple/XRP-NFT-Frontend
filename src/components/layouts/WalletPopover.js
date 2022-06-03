import * as React from "react";
import {Box, Button, Avatar, Typography, Modal} from "@mui/material";
import { Icon } from "@iconify/react";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
};

const walletStyle = {
    display: "flex",
    flexDirection: "row",
    border: '1px solid rgb(230, 230, 230)',
    borderRadius: "5px",
    padding: "10px",
    '&:hover': {
        boxShadow: "0px 0px 3px 3px rgb(200,200,200)",
        cursor: "pointer"
    }
}

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>
                <Icon icon="ic:round-account-balance-wallet" width="40" height="40" />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Wallets
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box sx={walletStyle}>
                            <Avatar alt="xumm" src="/static/xumm.jpg"/>
                            <h2 style={{marginLeft: '10px'}}>XUMM Wallet</h2>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
