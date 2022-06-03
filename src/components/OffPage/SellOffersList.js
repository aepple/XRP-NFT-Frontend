import { useState, useEffect } from 'react';
import {
    Avatar,
    Backdrop,
    Button,
    ButtonGroup,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    Typography
} from '@mui/material';
// import { deepOrange } from '@mui/material/colors';
import { Icon } from '@iconify/react';
import { acceptSellOffer, cancelOffer, getSellAndBuyOffers } from 'utils/tokenActions';
import { BuyOffersProps } from 'utils/types';
import { FadeLoader } from 'react-spinners';
import { useSelector } from 'react-redux'
import CountdownTimer from './CountDownTimer';
import { getUnixTimeEpochFromRippleEpoch } from 'utils/utils';
import QRCode from "react-qr-code";
import { useDispatch } from 'react-redux'
import { setNFTs } from 'app/slices/accountSlice'
import { useSnackbar } from 'notistack'


SellOffersList.propTypes = BuyOffersProps

// cannot accept buy offer if you are not the owner of token.
// cannot accept sell offer if seller is not the owner of token.
// cannot accept sell offer if recepient account is not you.
// cannot accept offer if the expiration time and the closing time of the parent ledger has passed.
// cannot accept an offer made by you.

export default function SellOffersList({ _offers, _NFTokenID, _isOwner }) {
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const account = useSelector(state => state.account.account)
    const login = useSelector(state => state.account.login)
    const [offers, setOffers] = useState([..._offers])
    const [openQR, setOpenQR] = useState(false)
    const [qrCode, setQRCode] = useState('')
    // const navigate = useNavigate()
    const dispatch = useDispatch()

    const openQRCode = (index) => {
        setQRCode(index)
        setOpenQR(true)
    }
    const handleCancelOffer = async (index) => {
        setLoading(true)
        try {
            const res = await cancelOffer(account.secret, index, _NFTokenID)
            setOffers(res.sellOffers)

            enqueueSnackbar('Cancel offer success:' + index.slice(0, 10) + '...', {
                variant: 'success'
            })
        } catch (e) {
            // TODO: snack bar error
            enqueueSnackbar(e.message, {
                variant: 'error'
            })
        }
        setLoading(false)
    }

    const handleAccept = async (index) => {
        setLoading(true)
        try {
            const res = await acceptSellOffer(account.secret, index)
            enqueueSnackbar('Accept offer success:' + index.slice(0, 10) + '...', {
                variant: 'success'
            })
            dispatch(setNFTs(res ?? []))
            const offers = await getSellAndBuyOffers(_NFTokenID)
            setOffers(offers.sellOffers)
        } catch (e) {
            // TODO: snack bar error
            enqueueSnackbar(e.message, {
                variant: 'error'
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        setOffers([..._offers])
    }, [_offers])
    return (
        <>
            <Backdrop
                sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <FadeLoader color='lightGreen' size={50} />
                {/* <Typography>loading...</Typography> */}
            </Backdrop>
            <Backdrop
                sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openQR}
                onClick={() => {
                    setOpenQR(false)
                }}
            >
                <div style={{ background: 'white', padding: '16px' }}>
                    <QRCode
                        // value={'hello, peter'}
                        value={qrCode}
                        size={256}
                    />
                </div>
            </Backdrop>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    offers.length ?
                        offers.map((offer) => (
                            <div key={offer.nft_offer_index}>
                                <ListItem alignItems='center' >
                                    <ListItemAvatar sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='caption'>
                                            Index
                                        </Typography>
                                        <Avatar sx={{ bgcolor: 'orange', cursor: 'pointer' }}
                                            onClick={() => openQRCode(offer.nft_offer_index)}
                                        >
                                            <Typography variant='string'>
                                                {offer.nft_offer_index.slice(0, 3)}
                                            </Typography>
                                        </Avatar>

                                    </ListItemAvatar>
                                    <Container sx={{ overflowWrap: 'anywhere' }}>
                                        <Grid container columnSpacing={3} alignItems='center'>
                                            <Grid item >
                                                <Typography
                                                    variant='caption'
                                                >
                                                    Price
                                                </Typography>
                                            </Grid>
                                            <Grid item >
                                                <Typography
                                                    variant='string'
                                                >
                                                    {offer.amount / (10 ** 6) + ' XRP'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container columnSpacing={3} alignItems='center'>
                                            <Grid item >
                                                <Typography
                                                    variant='caption'
                                                >
                                                    Owner:
                                                </Typography>
                                            </Grid>
                                            <Grid item >
                                                <Typography
                                                    variant='string'
                                                >
                                                    {offer.owner}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container columnSpacing={3} alignItems='center'>
                                            {
                                                offer.destination &&
                                                <>
                                                    <Grid item>
                                                        <Typography
                                                            variant='caption'
                                                        >
                                                            Destination:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item >
                                                        <Typography
                                                            variant='string'
                                                        >
                                                            {offer.destination}
                                                        </Typography>
                                                    </Grid>
                                                </>
                                            }
                                        </Grid>
                                        {
                                            offer.expiration ?
                                                <Grid container columnSpacing={3}>
                                                    <Grid item>
                                                        <Typography variant='caption'>Expires by {new Date(getUnixTimeEpochFromRippleEpoch(offer.expiration)).toLocaleString()}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <CountdownTimer targetDate={getUnixTimeEpochFromRippleEpoch(offer.expiration)} />
                                                    </Grid>
                                                </Grid>
                                                :
                                                <Grid container>

                                                    <Grid item>
                                                        <Typography variant='string'>No Expiration</Typography>
                                                    </Grid>
                                                </Grid>
                                        }
                                        <Grid container >
                                            <Grid item xs={12} >
                                                <ButtonGroup variant="outlined" >
                                                    <Button aria-label="accept"
                                                        onClick={() => handleAccept(offer.nft_offer_index)}
                                                        sx={{ borderRadius: 10 }}
                                                        color="success"
                                                        disabled={
                                                            // Can't accept
                                                            // when account is owner of offer
                                                            // or account is owner of nft
                                                            // account.key === offer.owner ||
                                                            // owner === account.key
                                                            !login || _isOwner || offer.owner === account.key
                                                        }
                                                        startIcon={<Icon icon='akar-icons:check' />}
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button aria-label="cancel"
                                                        onClick={() => handleCancelOffer(offer.nft_offer_index)}
                                                        sx={{ borderRadius: 10 }}
                                                        color="error"
                                                        disabled={
                                                            // Cant cancel offer when
                                                            // account is not owner of offer
                                                            // account.key !== offer.owner
                                                            !login || offer.owner !== account.key
                                                        }
                                                        startIcon={<Icon icon='iconoir:cancel' />}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </ButtonGroup>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </ListItem>
                                <Divider component='li' />
                            </div>
                        ))
                        :
                        <Typography>No Offers yet</Typography>
                }
            </List>
        </>
    );
}
