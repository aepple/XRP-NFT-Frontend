import { useState } from 'react'
import Page from "components/Page";
import AccountNfts from "components/NFTLists/AccountNfts";
import { useParams } from 'react-router-dom';
import AccountTxHistory from "components/account/AccountTxHistory";
import {
  Box,
  Tab,
  Tabs
} from "@mui/material";
import PropTypes from 'prop-types';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Account() {
  const { key } = useParams()
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Account-Info">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Collected" {...a11yProps(0)} />
            <Tab label="Trading History" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AccountNfts account={key} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AccountTxHistory account={key} />
        </TabPanel>
      </Box>
    </Page>
  );
}
