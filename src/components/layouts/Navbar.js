import * as React from 'react';
import { useContext } from 'react'
import Context from '../../Context'
import { Icon } from '@iconify/react';
import {
    Button,
    Toolbar,
    IconButton,
    Box,
    Link
} from '@mui/material';
import AccountPopover from './AccountPopover';
import Logo from 'components/atoms/Logo'
import baselineBrightnessHigh from '@iconify/icons-ic/baseline-brightness-high';
import baselineBrightness4 from '@iconify/icons-ic/baseline-brightness-4';
import { useSelector, useDispatch } from 'react-redux'
import { resetAccount } from 'app/slices/accountSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { resetIpfsState } from 'app/slices/ipfSlice'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import DropdownExpore from './DropdownExplore';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Navbar() {
    const { toggleThisTheme, isDarkMode } = useContext(Context);
    const login = useSelector(state => state.account.login)
    const key = useSelector(state => state.account.account.key)
    const dispatch = useDispatch()

    // disconnect current account
    const handleDisconnect = () => {
        dispatch(resetAccount())
        dispatch(resetIpfsState())
    };

    return (
        <Toolbar sx={{ gap: 5 }}>
            <Link href='/' sx={{ px: 2.5, display: 'inline-flex' }}>
                <Logo />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <DropdownExpore />
            {
                login ?
                    <>
                        <Link href='/create' underline='none'>
                            <Button >Create</Button>
                        </Link>
                        <Link href='/account' underline='none' >
                            <Button >My NFTs</Button>
                        </Link>
                        <Link href='/' underline='none'>
                            <Button endIcon={<LogoutIcon />} onClick={handleDisconnect} >
                                {key.slice(0, 4) + '...' + key.slice(-2)}
                            </Button>
                        </Link>
                    </>
                    :
                    <>
                        <Link href='/login' underline='none' variant='menu-item'>
                            <Button >
                                Connect
                            </Button>
                        </Link>
                    </>
            }
            <AccountPopover />
            <IconButton onClick={() => { toggleThisTheme('isDarkMode') }} >
                {isDarkMode ? (
                    <Icon icon={baselineBrightnessHigh} />
                ) : (
                    <Icon icon={baselineBrightness4} />
                )}
            </IconButton>
        </Toolbar>
    );
}
