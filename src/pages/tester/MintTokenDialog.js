import { useState } from 'react';
import {
    Dialog,
    Alert,
    AlertTitle
} from '@mui/material';
const xrpl = require("xrpl");

async function mintToken(showResult, showWaitDialog, values) {
    showWaitDialog(true);
    let res = null;
    let tmp;
    try {
        const wallet = xrpl.Wallet.fromSeed(values.secret)
        console.log('values:', values)
        console.log('secret:', values.secret)
        console.log('wallet:', wallet)
        const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
        await client.connect()
        console.log("Connected to Sandbox")

        // Note that you must convert the token URL to a hexadecimal
        // value for this transaction.
        // ----------------------------------------------------------
        const transactionBlob = {
            TransactionType: "NFTokenMint",
            Account: wallet.classicAddress,
            URI: xrpl.convertStringToHex(values.tokenUrl),
            Flags: parseInt(values.flags),
            TokenTaxon: 0 //Required, but if you have no use for it, set to zero.
        }
        // Submit signed blob --------------------------------------------------------
        const tx = await client.submitAndWait(transactionBlob,{wallet})

        const nfts = await client.request({
            method: "account_nfts",
            account: wallet.classicAddress
        })
        console.log(nfts)
        tmp = tx.result.meta.TransactionResult;
        // Check transaction results -------------------------------------------------
        console.log("Transaction result:", tmp)
        console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
        client.disconnect()
        res = tmp;
    } catch (error) {
        console.log(error);
        res = null;
    }
    showWaitDialog(false);
    showResult(res);
} //End of mintToken

// ----------------------------------------------------------------------
export default function MintTokenDialog({ values, setLoading, render }) {
    const [open, setOpen] = useState(false);
    const [res, setRes] = useState();

    const onMintToken = () => {
        mintToken(showResult, setLoading, values);
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
        {render(onMintToken)}
        <Dialog onClose={handleClose} open={open}>
            {res===null
                ?<Alert severity="error"variant="outlined">
                    <AlertTitle>Error</AlertTitle>
                    Please check your address
                    </Alert>
                :<Alert
                    variant="outlined"
                    severity="success">
                    <AlertTitle>{values.account}</AlertTitle>
                    <br/>
                    Minting successful!
                    <br/>
                </Alert>
            }
        </Dialog>
        </>
    );
}


