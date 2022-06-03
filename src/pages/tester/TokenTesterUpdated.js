import { useState } from "react";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import {
  Backdrop,
  Button,
  Stack,
  Container,
  Typography,
  Card,
} from "@mui/material";
import { HashLoader } from "react-spinners";
import { Box, TextField, IconButton } from "@mui/material";
import { StyledGrid } from "components/atoms/StyledComponents";
import { Link as RouterLink } from "react-router-dom";

import {
  Visibility,
  VisibilityOff,
  AccountBalanceWalletOutlined,
} from "@mui/icons-material";
import AccountInfoDialog from "./AccountInfoDialog";
import MintTokenDialog from "./MintTokenDialog";
// components
import Page from "../../components/Page";
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
];

export default function TokenTesterUpdated() {
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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickshowSecret = () => {
    setValues({
      ...values,
      showSecret: !values.showSecret,
    });
  };

  const handleMouseDownSecret = (event) => {
    event.preventDefault();
  };

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
      <Container maxWidth="xl" sx={{ marginTop: '2vh' }}>
        <Card sx={{ pl: 3, pb: 2 }}>
          <Container>
            <Box>
              <Stack
                alignItems="center"
                justifyContent="center"
                spacing={2}
                mb={1}
              >
                <Typography variant="h2" gutterBottom>
                  NFToken Tester
                </Typography>
                <Stack direction='row' spacing={3} alignItems='flex-end'>
                  <TextField
                    label="Account"
                    id="id_tester_account"
                    value={values.account}
                    onChange={handleChange("account")}
                    sx={{ m: 1, width: "40ch" }}
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <AccountInfoDialog
                          values={values}
                          setLoading={setLoading}
                          render={(onAccountInfo) => (
                            <IconButton onClick={onAccountInfo}>
                              <AccountBalanceWalletOutlined />
                            </IconButton>
                          )}
                        />
                      ),
                    }}
                  />
                  <TextField
                    label="Secret"
                    id="id_tester_secret"
                    type={values.showSecret ? "text" : "password"}
                    value={values.secret}
                    onChange={handleChange("secret")}
                    sx={{ m: 1, width: "40ch" }}
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={handleClickshowSecret}
                          onMouseDown={handleMouseDownSecret}
                        >
                          {values.showSecret ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                </Stack>
                <ChooseAccountDialog
                  accounts={accounts}
                  selectedIdx={selectedIndex}
                  onClose={handleChooseAccount}
                  render={(open) => (
                    <Button
                      variant="contained"
                      onClick={open}
                      sx={{ height: 'auto' }}
                      startIcon={<ManageAccountsOutlinedIcon />}
                    >
                      Account {accounts[selectedIndex - 1].id}
                    </Button>
                  )}
                />
                <TextField
                  label="Token URL"
                  id="id_tester_token_url"
                  value={values.tokenUrl}
                  onChange={handleChange("tokenUrl")}
                  sx={{ m: 1, width: "80ch" }}
                  variant="standard"
                />
                <TextField
                  label="Flags"
                  id="id_tester_flags"
                  value={values.flags}
                  onChange={handleChange("flags")}
                  sx={{ m: 1, width: "10ch" }}
                  variant="standard"
                />
                <TextField
                  label="Token ID"
                  id="id_tester_token_id"
                  value={values.tokenId}
                  sx={{ m: 1, width: "80ch" }}
                  variant="standard"
                />
                <TextField
                  label="Amount"
                  id="id_tester_amount"
                  value={values.amount}
                  onChange={handleChange("amount")}
                  sx={{ m: 1, width: "20ch" }}
                  variant="standard"
                />
                <TextField
                  label="Token Offer Index"
                  id="id_tester_token_offer_index"
                  value={values.tokenOfferIndex}
                  sx={{ m: 1, width: "80ch" }}
                  variant="standard"
                />
                <TextField
                  label="Owner"
                  id="id_tester_owner"
                  value={values.owner}
                  sx={{ m: 1, width: "80ch" }}
                  variant="standard"
                />
                <StyledGrid>

                  <MintTokenDialog
                    values={values}
                    setLoading={setLoading}
                    render={(onMintToken) => (
                      <Button variant="contained" onClick={onMintToken}>
                        Mint Token
                      </Button>
                    )}
                  />
                  <Button
                    variant="contained"
                    component={RouterLink}
                    sx={{ m: 1 }}
                    to="#"
                  >
                    Get Tokens
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    sx={{ m: 1 }}
                    to="#"
                  >
                    Burn Token
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    sx={{ m: 1 }}
                    to="#"
                  >
                    Create Sell Offer
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    sx={{ m: 1 }}
                    to="#"
                  >
                    Create Buy Offer
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    sx={{ m: 1 }}
                    to="#"
                  >
                    Get Offers
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    sx={{ m: 1 }}
                    to="#"
                  >
                    Accept Sell Offer
                  </Button>

                  <Button
                    variant="contained"
                    component={RouterLink}
                    sx={{ m: 1 }}
                    to="#"
                  >
                    Accept Buy Offer
                  </Button>

                  <Button
                    variant="contained"
                    component={RouterLink}
                    sx={{ m: 1 }}
                    to="#"
                  >
                    Cancel Offer
                  </Button>
                </StyledGrid>
              </Stack>

              <div>

              </div>
            </Box>
            <Box
              component="form"
              sx={{ flexWrap: "wrap" }}
              noValidate
              autoComplete="off"
            >
            </Box>
          </Container>
        </Card>
      </Container>
    </Page>
  );
}
