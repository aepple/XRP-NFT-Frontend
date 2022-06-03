import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack'
import { createBuyOffer } from 'utils/tokenActions'
const rippleAPI = require('ripple-address-codec')

export default function CreateBuyOfferDgContent({ close, NFTokenID, setOffers }) {
    const { enqueueSnackbar } = useSnackbar()
    const account = useSelector(state => state.account.account)
    const login = useSelector(state => state.account.login)
    const [price, setPrice] = useState(0)
    const [destination, setDestination] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleCreate = async () => {

        if (login) {
            if (rippleAPI.isValidClassicAddress(destination)) {
                setError(false)
                setLoading(true)
                try {
                    const res = await createBuyOffer(
                        account.secret,
                        NFTokenID,
                        Math.floor(price * 10 ** 6).toString(),
                        destination
                    )
                    if (res) {
                        setOffers(res)
                    }
                    enqueueSnackbar('Offer success!', {
                        variant: 'success'
                    })
                    close()
                } catch (e) {
                    enqueueSnackbar(e.message, {
                        variant: 'error'
                    })
                }
                setLoading(false)

            } else {
                setError(true)
            }
        } else {
            enqueueSnackbar('You have to log in first!', {
                variant: 'error'
            })
        }
    }

    const handleCancel = () => {
        close()
    }

    return (
        <>
            <DialogContent dividers sx={{ backgroundColor: 'theme.palette.background.paper' }}>
                <Box sx={{ paddingBottom: 2 }}>
                    <Grid container alignItems={'center'} spacing={3}>
                        <Grid item md={4} justifyContent='flex-end' sx={{ display: 'flex' }}>
                            <Typography variant='caption' >
                                Propose Price
                            </Typography>
                            <Tooltip
                                title={
                                    <Typography sx={{ color: 'white' }}>
                                        Enter your proposed purchase Amount in XRP.
                                    </Typography>}>
                                <InfoIcon fontSize={'8px'} />
                            </Tooltip>
                        </Grid>

                        <Grid item md={8}>
                            <TextField
                                variant='standard'
                                fullWidth
                                value={price}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">XRP</InputAdornment>,
                                }}
                                onChange={(e) => {
                                    if (!isNaN(+e.target.value))
                                        setPrice(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Divider />
                        </Grid>
                        <Grid item md={4} justifyContent='flex-end' sx={{ display: 'flex' }}>
                            <Typography variant='caption' >
                                Owner
                            </Typography>
                            <Tooltip
                                title={
                                    <Typography sx={{ color: 'white' }}>
                                        Must be owner of NFT.
                                    </Typography>}>
                                <InfoIcon fontSize={'8px'} />
                            </Tooltip>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                error={error}
                                helperText={error ? 'Incorrect Account' : ''}
                                placeholder='Account Address'
                                variant='standard'
                                fullWidth
                                value={destination}
                                onChange={(e) => {
                                    setDestination(e.target.value)
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    sx={{ padding: 1 }}
                    loading={loading}
                    loadingPosition='start'
                    startIcon={<Icon icon='logos:linux-mint' />}
                    onClick={handleCreate}
                >
                    Create
                </LoadingButton>
                <Button autoFocus onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </>
    )
}