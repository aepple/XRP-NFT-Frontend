import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Box,
    Button,
    ButtonGroup,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { createSellOffer } from 'utils/tokenActions'
import { getCurrentRippleEpoch } from 'utils/utils';
import { useSnackbar } from 'notistack'

export default function CreateSellOfferDgContent({ close, NFTokenID, setOffers }) {
    const { enqueueSnackbar } = useSnackbar()
    const account = useSelector(state => state.account.account)
    const login = useSelector(state => state.account.login)
    const [price, setPrice] = useState(0)
    const [expiration, setExpiration] = useState(0)
    const [destination, setDestination] = useState('')
    const [loading, setLoading] = useState(false)

    const handleCreate = async () => {
        if (login) {
            setLoading(true)
            try {
                const res = await createSellOffer(
                    account.secret,
                    NFTokenID,
                    Math.floor(price * 10 ** 6).toString(),
                    expiration ? getCurrentRippleEpoch() + 24 * 60 * 60 * expiration : 0,
                    destination
                )
                // if (res) {
                setOffers(res)
                // }
                enqueueSnackbar('Offer success!', {
                    variant: 'success'
                })
            } catch (e) {
                enqueueSnackbar(e.message, {
                    variant: 'error'
                })
            }
            setLoading(false)
            close()
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
                                Price
                            </Typography>
                            <Tooltip
                                title={
                                    <Typography sx={{ color: 'white' }}>
                                        Indicates the amount expected or offered for the corresponding NFToken. It is zero when this is an offer to sell and the asset is XRP; then, it is legal to specify an amount of zero, which means that the current owner of the token is giving it away, gratis, either to anyone at all, or to the account identified by the Destination field.
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
                                Expiration
                            </Typography>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                variant='standard'
                                fullWidth
                                label='Leave it to 0 if you do not want to set expiration time'
                                value={expiration}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                        <ButtonGroup orientation='vertical'>
                                            <IconButton size='small' sx={{ padding: 0 }}
                                                onClick={() => {
                                                    if (expiration < 7)
                                                        setExpiration(expiration + 1)
                                                }}
                                            >
                                                <ArrowDropUpIcon />
                                            </IconButton>
                                            <IconButton size='small' sx={{ padding: 0 }}
                                                onClick={() => {
                                                    if (expiration > 0)
                                                        setExpiration(expiration - 1)
                                                }}
                                            >
                                                <ArrowDropDownIcon />
                                            </IconButton>
                                        </ButtonGroup>
                                        {/* Days */}
                                    </InputAdornment>,
                                    endAdornment: <InputAdornment position="start">
                                        Days
                                    </InputAdornment>
                                }}
                                onChange={(e) => {
                                    if (!isNaN(+e.target.value) && +e.target.value < 8)
                                        setExpiration(+e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Divider />
                        </Grid>
                        <Grid item md={4} justifyContent='flex-end' sx={{ display: 'flex' }}>
                            <Typography variant='caption' >
                                Destination
                            </Typography>
                            <Tooltip
                                title={
                                    <Typography sx={{ color: 'white' }}>
                                        (Optional) If present, indicates that this offer may only be accepted by the specified account. Attempts by other accounts to accept this offer MUST fail.
                                    </Typography>}>
                                <InfoIcon fontSize={'8px'} />
                            </Tooltip>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
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