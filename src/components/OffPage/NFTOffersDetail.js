import { useState, useEffect } from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Skeleton,
    Stack,
    Typography,
    Button,
    Paper,
    Box,
} from '@mui/material'
import TimePeriods from 'components/OffPage/TimePeriodsDropdown'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import TimelineIcon from '@mui/icons-material/Timeline'
import ListIcon from '@mui/icons-material/List'
import { useSelector } from 'react-redux'
import { getSellAndBuyOffers } from 'utils/tokenActions'
import SellOffersList from './SellOffersList'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BuyOffersList from './BuyOffersList'
import { NFTOffersDetailProps } from 'utils/types'
import BaseDialog from 'components/dialog/BaseDialog';
import CreateSellOfferDgContent from 'components/dialog/CreateSellOfferDgContent'
import { Icon } from '@iconify/react';
import BurnNFTDgContent from 'components/dialog/BurnNFTDgContent'
import CreateBuyOfferDgContent from 'components/dialog/CreateBuyOfferDgContent'

NFTOffersDetail.prototype = NFTOffersDetailProps

export default function NFTOffersDetail({ NFTokenID, name, Issuer }) {
    const [isOpenSellDg, setIsOpenSellDg] = useState(false)
    const [isOpenBuyDg, setIsOpenBuyDg] = useState(false)
    const [isOpenBurnDg, setIsOpenBurnDg] = useState(false)
    const account_nfts = useSelector(state => state.account.nfts)
    const isOwner = account_nfts.findIndex((nft) => nft.NFTokenID === NFTokenID) > -1
    const login = useSelector(state => state.account.login)
    const [isPageLoading, setPageLoading] = useState(false)
    const [sellOffers, setSellOffers] = useState([])
    const [buyOffers, setBuyOffers] = useState([])

    const fetchOffers = async (mounted) => {
        setPageLoading(true)
        try {
            const res = await getSellAndBuyOffers(NFTokenID)
            if (mounted) {
                console.log({ res })
                setBuyOffers(res.buyOffers)
                setSellOffers(res.sellOffers)
            }
        } catch (e) {
            console.log(e)
            // openSnackbar(e.message, 'error')
        }
        setPageLoading(false)
    }

    useEffect(() => {
        let mounted = true
        fetchOffers(mounted)

        return () => {
            mounted = false
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Stack spacing={2} marginTop={1}>
                {/* <Link underline='none' color={'text.primary'}>
                    Name
                </Link> */}
                <Typography variant='subtitle' gutterBottom fontSize={30} overflow='hidden' fontWeight={600}>
                    {name ? name : 'Unknown'}
                </Typography>
            </Stack>

            {/* Make offer start */}
            <Paper sx={{
                padding: 2,

            }}>
                {
                    isOwner && <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <Button
                            sx={{ borderRadius: 10, width: 200 }}
                            variant='outlined'
                            startIcon={<LocalOfferIcon />}
                            onClick={() => setIsOpenSellDg(true)}
                            color='success'
                            disabled={!login}
                        >
                            Sell
                        </Button>
                        <Button
                            variant='outlined'
                            sx={{ borderRadius: 10, width: 200 }}
                            color='warning'
                            startIcon={<Icon icon='ps:feedburner' />}
                            onClick={() => setIsOpenBurnDg(true)}
                            disabled={!isOwner || !login} // you cannot burn NFToken if you are not owner
                        >
                            Burn
                        </Button>
                    </Box>
                }
                {
                    !isOwner &&
                    <Button
                        sx={{ borderRadius: 10 }}
                        disabled={!login}
                        variant='outlined'
                        // onClick={makeBuyOffer}
                        onClick={() => setIsOpenBuyDg(true)}
                        startIcon={<LocalOfferIcon />}
                    >
                        Make offer
                    </Button>
                }
            </Paper>
            {/* Make offer end */}

            {/* Sell Offers start */}
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel3a-content'
                    id='panel3a-header'
                >
                    <Stack direction='row' spacing={2}>
                        <LocalOfferIcon />
                        <Typography variant='string' >Sell Offers</Typography>
                    </Stack>
                </AccordionSummary>
                <Divider />
                <AccordionDetails sx={{ margin: 3, textAlign: 'center' }}>
                    {/* {
                        offers.error ? <Typography>Error: {offers.error.message}</Typography> :
                            !offers.data ? <Skeleton animation='wave' height={100} width='100%' /> :
                                offers.data.sellOffers ?
                                    <SellOffersList
                                        id={offers.data.sellOffers.id}
                                        result={offers.data.sellOffers.result}
                                        NFTokenID={NFTokenID}
                                        isOwner={isOwner}
                                    /> :
                                    <Typography variant='string'>
                                        No sell offers yet!
                                    </Typography>

                    } */}
                    {isPageLoading ?
                        <Skeleton animation='wave' height={100} width='100%' />
                        :
                        <SellOffersList
                            _offers={sellOffers}
                            _NFTokenID={NFTokenID}
                            _isOwner={isOwner}
                        />
                    }
                </AccordionDetails>
            </Accordion>
            {/* Sell Offers end */}

            {/* Buy Offers start */}
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel3a-content'
                    id='panel3a-header'
                >
                    <Stack direction='row' spacing={2}>
                        <ListIcon />
                        <Typography variant='string' >Buy Offers</Typography>
                    </Stack>
                </AccordionSummary>
                <Divider />
                <AccordionDetails sx={{ margin: 3, textAlign: 'center' }}>
                    {isPageLoading ?
                        <Skeleton animation='wave' height={100} width='100%' />
                        :
                        <BuyOffersList
                            _offers={buyOffers}
                            _NFTokenID={NFTokenID}
                            _isOwner={isOwner}
                        />}
                    {/* {
                        offers.error ? <Typography>Error: {offers.error.message}</Typography> :
                            !offers.data ? <Skeleton animation='wave' height={100} width='100%' /> :
                                <BuyOffersList id={offers.data.buyOffers?.id} result={offers.data.buyOffers?.result} isOwner={isOwner} />
                    } */}
                </AccordionDetails>
            </Accordion>
            {/* Buy Offers end */}


            {/* Price History Start */}
            <Accordion defaultExpanded >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel2a-content'
                    id='panel2a-header'
                >
                    <Stack direction='row' spacing={2}>
                        <TimelineIcon />
                        <Typography variant='string' >Price History</Typography>
                    </Stack>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TimePeriods />
                    {/* <img src={activity} /> */}
                    <Typography sx={{ margin: 3, textAlign: 'center' }}>
                        No item activity yet
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/* Price History end */}

            <BaseDialog
                isOpen={isOpenSellDg}
                close={() => {
                    setIsOpenSellDg(false)
                }}
                title={'Create Sell Offer'}
                render={
                    <CreateSellOfferDgContent
                        close={() => {
                            setIsOpenSellDg(false)
                        }}
                        NFTokenID={NFTokenID}
                        setOffers={(offers) => setSellOffers(offers)}
                    />}
            />
            <BaseDialog
                isOpen={isOpenBurnDg}
                close={() => {
                    setIsOpenBurnDg(false)
                }}
                title={'Burn NFT'}
                render={
                    <BurnNFTDgContent
                        close={() => {
                            setIsOpenBurnDg(false)
                        }}
                        NFTokenID={NFTokenID}
                    />}
            />
            <BaseDialog
                isOpen={isOpenBuyDg}
                close={() => {
                    setIsOpenBuyDg(false)
                }}
                title={'Make Buy Offer'}
                render={
                    <CreateBuyOfferDgContent
                        close={() => {
                            setIsOpenBuyDg(false)
                        }}
                        NFTokenID={NFTokenID}
                        setOffers={(offers) => setBuyOffers(offers)}
                    />}
            />
        </div>
    )
}

