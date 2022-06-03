//import { useState, useEffect } from "react";
//import axios from "axios";
//import useWebSocket, { ReadyState } from "react-use-websocket";
import { Box, Dialog/*, DialogTitle, Divider*/ } from '@mui/material';
//import { useContext } from 'react'
//import Context from '../Context'

export default function LoginDialog(props) {
    const qrUrl = props.qrUrl;

    const onClose = () => {
        props.handleClose();
    };

    return (
        <Dialog onClose={onClose} open={props.open}>
            {/* <DialogTitle>Scan the QR code from your XUMM app</DialogTitle> */}
            {/* <Divider /> */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

                <Box
                    component="img"
                    sx={{
                    }}
                    alt="QR"
                    src={qrUrl}
                    />
            </div>
      </Dialog>
    );
}
