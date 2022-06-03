import { useState, useEffect } from 'react';
import { List, Container, Grid, ButtonGroup, Backdrop, Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import { acceptBuyOffer, cancelOffer } from 'utils/tokenActions';
import { BuyOffersProps } from 'utils/types';
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { FadeLoader } from 'react-spinners';
import { setNFTs } from 'app/slices/accountSlice'
import { useDispatch } from 'react-redux'

// cannot accept buy offer if you are not the owner of token.
// cannot accept sell offer if seller is not the owner of token.
// cannot accept sell offer if recepient account is not you.
// cannot accept offer if the expiration time and the closing time of the parent ledger has passed.
// cannot accept an offer made by you.

BuyOffersList.propTypes = BuyOffersProps

export default function BuyOffersList({ _NFTokenID, _offers, _isOwner }) {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const account = useSelector(state => state.account.account)
    const login = useSelector(state => state.account.login)
    const [offers, setOffers] = useState([..._offers])
    const handleCancelOffer = async (index) => {
        setLoading(true)
        try {
            const res = await cancelOffer(account.secret, index, _NFTokenID)
            setOffers(res.buyOffers)
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
            const res = await acceptBuyOffer(account.secret, index)
            enqueueSnackbar('Accept offer success:' + index.slice(0, 10) + '...', {
                variant: 'success'
            })
            dispatch(setNFTs(res.account_nfts))

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
            </Backdrop>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    offers.length ?
                        offers.map((offer) => (
                            <div key={offer.nft_offer_index}>
                                <ListItem alignItems='center' >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'lightseagreen' }}>
                                            <Typography>
                                                {offer.nft_offer_index.slice(0, 3)}
                                            </Typography>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <Container sx={{ overflowWrap: 'anywhere' }}>
                                        <Grid container>
                                            <Grid item xs={2}>
                                                <Typography
                                                    variant='subtitle1'
                                                >
                                                    Price
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography
                                                    variant='string'
                                                >
                                                    {offer.amount / (10 ** 6) + ' XRP'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography
                                                    variant='subtitle1'
                                                >
                                                    Offerer:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography
                                                    variant='string'
                                                >
                                                    {offer.owner}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} >
                                                <ButtonGroup variant="outlined">
                                                    <Button aria-label="accept"
                                                        onClick={() => handleAccept(offer.nft_offer_index)}
                                                        color="success"
                                                        disabled={      // Can't accept Buy offer when
                                                            !login      // not connected
                                                            || !_isOwner  // account is not owner of nft
                                                            || offer.owner === account.key  // or account is owner of offer
                                                            // account.key === offer.owner
                                                            // || owner === offer.owner
                                                        }
                                                        sx={{ borderRadius: 10 }}
                                                        startIcon={<Icon icon='akar-icons:check' />}
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button aria-label="cancel"
                                                        onClick={() => handleCancelOffer(offer.nft_offer_index)}
                                                        color="error"
                                                        disabled={
                                                            // Can't cancel buy offer
                                                            // when the account is not
                                                            // owner of offer
                                                            account.key !== offer.owner
                                                            || !login
                                                        }
                                                        sx={{ borderRadius: 10 }}
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
