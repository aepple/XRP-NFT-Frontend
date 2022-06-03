import { useState } from "react";
//import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
//import PropTypes from 'prop-types';
// icons
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
// material
import {
  Backdrop,
  Button,
  Stack,
  Container,
  Typography,
  Card,
} from "@mui/material";
import { HashLoader } from "react-spinners";

// components
import Page from "../../components/Page";
import TesterControls from "./TesterControls";
import ChooseAccountDialog from "../../components/dialog/ChooseAccountDialog";

const accounts = [
  {
    id: 1,
    key: "rH6jr16vArKBneg2Hzy1bgC9ewdMReYavH",
    secret: "shsUVURnRc6dC1Y2aqpkhu3dDG2eu",
  },
  {
    id: 2,
    key: "r3tuno9Nkd2zpEDBdSJMtyeQ6sZb9CXy88",
    secret: "ssWxNRgrAzECJzLpeUoL8dYvCixtn",
  },
  {
    id: 3,
    key: "rGS2zSMwHP3j6Rqm9D5r4iTwoucHwAfAM9",
    secret: "ssUPpTPeNFUUgUkHS46WY6tXgKgxK",
  },
  {
    id: 4,
    key: "r3cu51e1qWBVALPArjBmcHAwMyMrSWRREX",
    secret: "ssXfMEPz1wBvNv11CDVq6dfmXmCnP",
  },
  {
    id: 5,
    key: "rK7eKU18TgbMReccVDtkQu2kfLYmirdVS9",
    secret: "shsh6ty64sqNCu9bkCqUwqCCFbwss",
  },
  /*{id:6, key:'r9f3fG8Y1QjZ9gdYMb3by2T5vkfLE2qYxb', secret:'shcBBdHbtYGMWvR54d3tJaPwpFLDn'},
	{id:7, key:'rLsxBDBg2E129qoMWxk9PKpjmvsU59dWoB', secret:'ssqxhYpqpbpNL5NzjfDLYBRJq9w21'},
	{id:8, key:'rPrzGpuLxnE2XWzNYJ2P1tR6mCQU2FcckS', secret:'snDiyu26npfn6FBFXZJbKNNyZtwSH'},
	{id:9, key:'rPku8R9rWfZu73U8SxAuy7Leac5NaqfNfh', secret:'sn3ivz8y8UvHwoFA8jKSX8rGRyyyf'},
	{id:10, key:'rwjXkasNG3RGfddbo2o9Rd7tEZetnPHH4f', secret:'shsaEo9V1iqtebYZkUaFfndrSr4JB'},
    {id:11, key:'rp6yyGhjFR4Va6Eor8aPDAjj57R9cawqWn', secret:'sh1yErMN7rkZegwuTg1ZNMvRAGiQM'},*/
];

// https://xrpl.org/xrp-testnet-faucet.html

// ====================================
// Testnet Servers
// WebSocket
// wss://s.altnet.rippletest.net:51233
// JSON-RPC
// https://s.altnet.rippletest.net:51234
// ====================================
// Devnet Servers
// WebSocket
// wss://s.devnet.rippletest.net:51233
// JSON-RPC
// https://s.devnet.rippletest.net:51234
// ====================================
// NFT-Devnet Servers
// WebSocket 54.190.29.31
// wss://xls20-sandbox.rippletest.net:51233
// JSON-RPC
// http://xls20-sandbox.rippletest.net:51234
// ====================================
const xrpl = require("xrpl");
//***************************
//** Get Tokens *************
//***************************
/* async function getTokens(showWaitDialog, values) {
  showWaitDialog(true);
  try {
    const wallet = xrpl.Wallet.fromSeed(values.secret);
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
    await client.connect();
    console.log("Connected to Sandbox");
    const nfts = await client.request({
      method: "account_nfts",
      account: wallet.classicAddress,
    });
    console.log(nfts);
    client.disconnect();
  } catch (error) {
    console.log(error);
  }
  showWaitDialog(false);
} //End of getTokens */

//***************************
//** Burn Token *************
//***************************
/* async function burnToken(showWaitDialog, values) {
  showWaitDialog(true);
  try {
    const wallet = xrpl.Wallet.fromSeed(values.secret);
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
    await client.connect();
    console.log("Connected to Sandbox");

    // Prepare transaction -------------------------------------------------------
    const transactionBlob = {
      TransactionType: "NFTokenBurn",
      Account: wallet.classicAddress,
      TokenID: values.tokenId,
    };

    // Submit signed blob --------------------------------------------------------
    const tx = await client.submitAndWait(transactionBlob, { wallet });
    const nfts = await client.request({
      method: "account_nfts",
      account: wallet.classicAddress,
    });
    console.log(nfts);
    // Check transaction results -------------------------------------------------
    console.log("Transaction result:", tx.result.meta.TransactionResult);
    console.log(
      "Balance changes:",
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    );
    client.disconnect();
  } catch (error) {
    console.log(error);
  }
  showWaitDialog(false);
} */
// End of burnToken()

//********************************
//** Create Sell Offer ***********
//********************************
/* async function createSellOffer(showWaitDialog, values) {
  showWaitDialog(true);
  try {
    const wallet = xrpl.Wallet.fromSeed(values.secret);
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
    await client.connect();
    console.log("Connected to Sandbox");

    // Prepare transaction -------------------------------------------------------
    const transactionBlob = {
      TransactionType: "NFTokenCreateOffer",
      Account: wallet.classicAddress,
      TokenID: values.tokenId,
      Amount: values.amount,
      Flags: parseInt(values.flags),
    };

    // Submit signed blob --------------------------------------------------------

    const tx = await client.submitAndWait(transactionBlob, { wallet }); //AndWait
    console.log("***Sell Offers***");
    let nftSellOffers;
    try {
      nftSellOffers = await client.request({
        method: "nft_sell_offers",
        tokenid: values.tokenId,
      });
    } catch (err) {
      console.log("No sell offers.");
    }
    console.log(JSON.stringify(nftSellOffers, null, 2));
    console.log("***Buy Offers***");
    let nftBuyOffers;
    try {
      nftBuyOffers = await client.request({
        method: "nft_buy_offers",
        tokenid: values.tokenId,
      });
    } catch (err) {
      console.log("No buy offers.");
    }
    console.log(JSON.stringify(nftBuyOffers, null, 2));

    // Check transaction results -------------------------------------------------
    console.log(
      "Transaction result:",
      JSON.stringify(tx.result.meta.TransactionResult, null, 2)
    );
    console.log(
      "Balance changes:",
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    );
    client.disconnect();
    // End of createSellOffer()
  } catch (error) {
    console.log(error);
  }
  showWaitDialog(false);
} */

//********************************
//** Create Buy Offer ***********
//********************************
/* async function createBuyOffer(showWaitDialog, values) {
  showWaitDialog(true);
  try {
    const wallet = xrpl.Wallet.fromSeed(values.secret);
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
    await client.connect();
    console.log("Connected to Sandbox");

    // Prepare transaction -------------------------------------------------------
    const transactionBlob = {
      TransactionType: "NFTokenCreateOffer",
      Account: wallet.classicAddress,
      Owner: values.owner,
      TokenID: values.tokenId,
      Amount: values.amount,
      Flags: parseInt(values.flags),
    };

    // Submit signed blob --------------------------------------------------------
    const tx = await client.submitAndWait(transactionBlob, { wallet });

    console.log("***Sell Offers***");
    let nftSellOffers;
    try {
      nftSellOffers = await client.request({
        method: "nft_sell_offers",
        tokenid: values.tokenId,
      });
    } catch (err) {
      console.log("No sell offers.");
    }
    console.log(JSON.stringify(nftSellOffers, null, 2));
    console.log("***Buy Offers***");
    let nftBuyOffers;
    try {
      nftBuyOffers = await client.request({
        method: "nft_buy_offers",
        tokenid: values.tokenId,
      });
    } catch (err) {
      console.log("No buy offers.");
    }
    console.log(JSON.stringify(nftBuyOffers, null, 2));

    // Check transaction results -------------------------------------------------
    console.log(
      "Transaction result:",
      JSON.stringify(tx.result.meta.TransactionResult, null, 2)
    );
    console.log(
      "Balance changes:",
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    );
    client.disconnect();
    // End of createBuyOffer()
  } catch (error) {
    console.log(error);
  }
  showWaitDialog(false);
} */

//***************************
//** Cancel Offer ***********
//***************************
/* async function cancelOffer(showWaitDialog, values) {
  showWaitDialog(true);
  try {
    const wallet = xrpl.Wallet.fromSeed(values.secret);
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
    await client.connect();
    console.log("Connected to Sandbox");

    const tokenID = values.tokenOfferIndex;
    const tokenIDs = [tokenID];

    // Prepare transaction -------------------------------------------------------
    const transactionBlob = {
      TransactionType: "NFTokenCancelOffer",
      Account: wallet.classicAddress,
      TokenIDs: tokenIDs,
    };

    // Submit signed blob --------------------------------------------------------
    const tx = await client.submitAndWait(transactionBlob, { wallet });

    console.log("***Sell Offers***");
    let nftSellOffers;
    try {
      nftSellOffers = await client.request({
        method: "nft_sell_offers",
        tokenid: values.tokenId,
      });
    } catch (err) {
      console.log("No sell offers.");
    }
    console.log(JSON.stringify(nftSellOffers, null, 2));
    console.log("***Buy Offers***");
    let nftBuyOffers;
    try {
      nftBuyOffers = await client.request({
        method: "nft_buy_offers",
        tokenid: values.tokenId,
      });
    } catch (err) {
      console.log("No buy offers.");
    }
    console.log(JSON.stringify(nftBuyOffers, null, 2));

    // Check transaction results -------------------------------------------------

    console.log(
      "Transaction result:",
      JSON.stringify(tx.result.meta.TransactionResult, null, 2)
    );
    console.log(
      "Balance changes:",
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    );

    client.disconnect();
    // End of cancelOffer()
  } catch (error) {
    console.log(error);
  }
  showWaitDialog(false);
} */

//***************************
//** Get Offers *************
//***************************
/* async function getOffers(showWaitDialog, values) {
  showWaitDialog(true);
  try {
    const wallet = xrpl.Wallet.fromSeed(values.secret);
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
    await client.connect();
    console.log("Connected to Sandbox");
    console.log("***Sell Offers***");
    let nftSellOffers;
    try {
      nftSellOffers = await client.request({
        method: "nft_sell_offers",
        tokenid: values.tokenId,
      });
    } catch (err) {
      console.log("No sell offers.");
    }
    console.log(JSON.stringify(nftSellOffers, null, 2));
    console.log("***Buy Offers***");
    let nftBuyOffers;
    try {
      nftBuyOffers = await client.request({
        method: "nft_buy_offers",
        tokenid: values.tokenId,
      });
    } catch (err) {
      console.log("No buy offers.");
    }
    console.log(JSON.stringify(nftBuyOffers, null, 2));
    client.disconnect();
    // End of getOffers()
  } catch (error) {
    console.log(error);
  }
  showWaitDialog(false);
} */

//***************************
//** Accept Sell Offer ******
//***************************
/* async function acceptSellOffer(showWaitDialog, values) {
  showWaitDialog(true);
  try {
    const wallet = xrpl.Wallet.fromSeed(values.secret);
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
    await client.connect();
    console.log("Connected to Sandbox");

    // Prepare transaction -------------------------------------------------------
    const transactionBlob = {
      TransactionType: "NFTokenAcceptOffer",
      Account: wallet.classicAddress,
      SellOffer: values.tokenOfferIndex,
    };
    // Submit signed blob --------------------------------------------------------
    const tx = await client.submitAndWait(transactionBlob, { wallet });
    const nfts = await client.request({
      method: "account_nfts",
      account: wallet.classicAddress,
    });
    console.log(JSON.stringify(nfts, null, 2));

    // Check transaction results -------------------------------------------------
    console.log(
      "Transaction result:",
      JSON.stringify(tx.result.meta.TransactionResult, null, 2)
    );
    console.log(
      "Balance changes:",
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    );
    client.disconnect();
    // End of acceptSellOffer()
  } catch (error) {
    console.log(error);
  }
  showWaitDialog(false);
} */

//***************************
//** Accept Buy Offer ******
//***************************
/*async function acceptBuyOffer(showWaitDialog, values) {
  showWaitDialog(true);
  try {
    const wallet = xrpl.Wallet.fromSeed(values.secret);
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
    await client.connect();
    console.log("Connected to Sandbox");

    // Prepare transaction -------------------------------------------------------
    const transactionBlob = {
      TransactionType: "NFTokenAcceptOffer",
      Account: wallet.classicAddress,
      BuyOffer: values.tokenOfferIndex,
    };
    // Submit signed blob --------------------------------------------------------
    const tx = await client.submitAndWait(transactionBlob, { wallet });
    const nfts = await client.request({
      method: "account_nfts",
      account: wallet.classicAddress,
    });
    console.log(JSON.stringify(nfts, null, 2));

    // Check transaction results -------------------------------------------------
    console.log(
      "Transaction result:",
      JSON.stringify(tx.result.meta.TransactionResult, null, 2)
    );
    console.log(
      "Balance changes:",
      JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    );
    client.disconnect();
    // End of submitTransaction()
  } catch (error) {
    console.log(error);
  }
  showWaitDialog(false);
} */

export default function TokenTester() {
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [values, setValues] = useState({
    account: accounts[0].key,
    secret: accounts[0].secret,
    showSecret: false,
    tokenUrl: "ipfs://QmXSSpHaG9DH5U7zQNkL4BZrBZioGG3xmG54mqPqTCpddQ",
    flags: "12",
    tokenId: "",
    amount: "1000000",
    tokenOfferIndex: "",
    owner: "",
  });
  //useEffect(() => {
  //});

  const handleChooseAccount = (value) => {
    setSelectedIndex(value);
    setValues({
      ...values,
      account: accounts[value - 1].key,
      secret: accounts[value - 1].secret,
    });
  };
  return (
    <Page title="NFToken Tester">
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <HashLoader color={"#00AB55"} size={50} />
      </Backdrop>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={2}
          mb={1}
        >
          <Typography variant="h4" gutterBottom>
            NFToken Tester
          </Typography>

          <ChooseAccountDialog
            accounts={accounts}
            selectedIdx={selectedIndex}
            onClose={handleChooseAccount}
            render={(open) => (
              <Button
                variant="contained"
                onClick={open}
                startIcon={<ManageAccountsOutlinedIcon />}
              >
                Account {accounts[selectedIndex - 1].id}
              </Button>
            )}
          />
        </Stack>

        <Card sx={{ pl: 3, pb: 2 }}>
          <TesterControls
            values={values}
            setLoading={setLoading}
            setValues={setValues}
          />
        </Card>
      </Container>
    </Page>
  );
}
