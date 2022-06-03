import { useState } from 'react';
import {
    Dialog,
    Alert,
    AlertTitle
} from '@mui/material';
const xrpl = require("xrpl");

async function getAccountInfo(showResult, showWaitDialog, values) {
    showWaitDialog(true);
    let res=null;
    try {
        const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
        await client.connect();

        const response = await client.request({
            "command": "account_info",
            "account": values.account,
            "ledger_index": "validated"
        });
        res = response.result.account_data;
        console.log(response);
        client.disconnect();
    } catch (error) {
        res = null;
        console.log(error);
    }
    showWaitDialog(false);


    // res = { // Account info return
    //     "id": 0,
    //     "result": {
    //         "account_data": {
    //             "Account": "rht9PFsHK2rds9dp5Nt9op4VWAceR63vWH",
    //             "Balance": "9999999952", // There are one million drops per XRP.
    //             "Flags": 0,
    //             "LedgerEntryType": "AccountRoot",
    //             "MintedTokens": 4,
    //             "OwnerCount": 1,
    //             "PreviousTxnID": "FCD543B99DE4F6EEC520C94501031000415F67E2F1BC014151CCBF6556988DB7",
    //             "PreviousTxnLgrSeq": 258324,
    //             "Sequence": 257656,
    //             "index": "5F0609FDFA077F68ED7F5C2F38C16E2C7B16FFD3FD2DC17CB81C7E117E3C7C7E"
    //         },
    //         "ledger_hash": "AC48ABEB942844E2F084DA4D5BA8767B1CB480A8124A0EAD0CAC3294BD096EB5",
    //         "ledger_index": 382985,
    //         "validated": true
    //     },
    //     "type": "response"
    // };
    showResult(res);
}

// ----------------------------------------------------------------------
export default function AccountInfoDialog({ values, setLoading, render }) {
    const [open, setOpen] = useState(false);
    const [res, setRes] = useState([]);

    const onAccountInfo = () => {
        getAccountInfo(showResult, setLoading, values);
     };

    const showResult = (response) => {
        setOpen(true);
        setRes(response);
     };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleOk = () => {
    //     handleClose();
    // };

    return (
        <>
        {render(onAccountInfo)}
        <Dialog onClose={handleClose} open={open}>
            {res===null
                ?<Alert severity="error"variant="outlined">
                    <AlertTitle>Error</AlertTitle>
                    Please check your address
                    </Alert>
                :<Alert
                    variant="outlined"
                    severity="success">
                    <AlertTitle>{res.Account}</AlertTitle>
                    Balance(XRP): <strong>{parseInt(res.Balance)/1000000} </strong>
                    <br/>
                    Minted Tokens: <strong>{res.MintedTokens}</strong>
                </Alert>
            }
        </Dialog>
        </>
    );
}


