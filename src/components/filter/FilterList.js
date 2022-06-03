import * as React from 'react';
import List from '@mui/material/List';
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from 'app/slices/filterSlice'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material'
import { Icon } from '@iconify/react';

export default function FilterList() {
    const dispatch = useDispatch()
    const [openStatus, setOpenStatus] = React.useState(true);
    const [openPrice, setOpenPrice] = React.useState(true);
    const [openCollections, setOpenCollections] = React.useState(true);

    const flag = useSelector(state => state.filter.flag)

    const handleFilterClick = (id) => {
        dispatch(changeFilter(id))
    }

    // dropdown filters
    const handleStatusClick = () => {
        setOpenStatus(!openStatus);
    };
    const handlePriceClick = () => {
        setOpenPrice(!openPrice);
    };
    const handleCollectionsClick = () => {
        setOpenCollections(!openCollections);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, padding: 0 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <Divider />
            <ListItemButton onClick={handleStatusClick}>
                <ListItemText primary="Flags" />
                {openStatus ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openStatus} timeout="auto" unmountOnExit>
                {/* <List component="div" disablePadding> */}
                <Grid container justifyContent='center' direction='row' spacing={1} margin={2} marginTop={1} width='auto'>
                    <Grid item >
                        <Button
                            onClick={() => handleFilterClick(0x0001)}
                            variant={flag & 0x0001 ? 'contained' : 'outlined'}
                            sx={{ width: '100%' }}
                            startIcon={<Icon icon='ps:feedburner' />}
                        >
                            Burnable
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button
                            onClick={() => handleFilterClick(0x0002)}
                            variant={flag & 0x0002 ? 'contained' : 'outlined'}
                            sx={{ width: '100%' }}
                            startIcon={<Icon icon="teenyicons:ripple-solid" />}
                        >
                            Only XRP
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button
                            onClick={() => handleFilterClick(0x0004)}
                            variant={flag & 0x0004 ? 'contained' : 'outlined'}
                            sx={{ width: '100%' }}
                            startIcon={<Icon icon='codicon:workspace-trusted' />}
                        >
                            Trustline
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button
                            onClick={() => handleFilterClick(0x0008)}
                            variant={flag & 0x0008 ? 'contained' : 'outlined'}
                            sx={{ width: '100%' }}
                            startIcon={<Icon icon='mdi:transit-transfer' />}
                        >
                            Transferable
                        </Button>
                    </Grid>
                </Grid>
                {/* </List> */}
            </Collapse>
            <Divider />
            <ListItemButton onClick={handlePriceClick}>
                <ListItemText primary="Price" />
                {openPrice ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPrice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Incoming contents" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Divider />
            <ListItemButton onClick={handleCollectionsClick}>
                <ListItemText primary="Collections" />
                {openCollections ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCollections} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Incoming contents" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}
