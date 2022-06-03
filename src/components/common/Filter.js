import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterList from '../filter/FilterList';
import PropTypes from 'prop-types';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

Filter.propTypes = {
    isMarket: PropTypes.bool
}

export default function Filter({ isMarket }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* <AppBarStyle position="fixed" open={open} sx={!open ? { top: 'auto', width: 'auto', height: '100%', right: 'auto' } : { display: 'none' }} > */}
            <AppBar position="fixed" open={open} sx={{ top: 'auto' }} >
                {/* <Toolbar sx={open ? {} : { '&.MuiToolbar-root': { padding: 0 } }}> */}
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        // sx={{ mr: 2, ...(open && { display: 'none' }), margin: 0 }}
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                    <div>
                        <Typography variant="h6" noWrap component="div" sx={isMarket?{}:{display: 'none'}}>
                            24583 items
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        top: 'auto',
                        boxShadow: 'none',
                        backdropFilter: 'blur(2px)',
                        WebkitBackdropFilter: 'blur(2px)', // Fix on Mobile
                        // backgroundColor: `${theme.palette.background.paper}00`,
                        borderRadius: '0px',
                        color: theme.palette.text.primary
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ justifyContent: 'space-between', paddingLeft: '1vw' }}>
                    <Typography variant="h6" noWrap component="div">
                        Filter
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <FilterList />
                <Divider />
            </Drawer>
        </Box>
    );
}
