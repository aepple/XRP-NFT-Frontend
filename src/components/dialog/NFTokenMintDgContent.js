import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    Grid,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import TokenFlagsForm from 'components/miniting/TokenFlagsForm'
import { tfTransferable, XRPNFT_DOMAIN } from 'utils/constants'
import InfoIcon from '@mui/icons-material/Info';
import { mintToken } from 'utils/tokenActions'
import { resetIpfsState } from 'app/slices/ipfSlice'
import { pinJsonToIPFS } from 'utils/pinata'
import { setNFTs } from 'app/slices/accountSlice'
import { useSnackbar } from 'notistack'

export default function NFTokenMintDgContent({ close, metadata }) {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const flags = useSelector(state => state.ipfs.flags)
    const [loading, setLoading] = useState(false)
    const [issuer, setIssuer] = useState('')
    const [tFee, setFee] = useState(3) //transfer fee
    const [NFTokenTaxon, setNFTokenTaxon] = useState(0) //NFTokenTaxon
    const account = useSelector(state => state.account.account)

    const handleCreate = async () => {
        setLoading(true)
        try {
            const res = await pinJsonToIPFS(metadata)
            if (res.success) {
                const nftMetadataUrl = XRPNFT_DOMAIN + res.response.IpfsHash
                try {
                    const res = await mintToken(account.secret, nftMetadataUrl, flags, issuer, tFee * 100)
                    dispatch(setNFTs(res.account_nfts))
                    enqueueSnackbar('Minting success, ' + JSON.stringify(res.account ?? ''), {
                        variant: 'success'
                    })
                    // TODO: reset ipfs slice when minting succeed
                    dispatch(resetIpfsState())
                    close()
                } catch (e) {
                    enqueueSnackbar(e.message, {
                        variant: 'error'
                    })
                }
            } else {
                enqueueSnackbar('Json Not pinned to Pinata.', {
                    variant: 'error'
                })
            }
        } catch (e) {
            enqueueSnackbar(e.message, {
                variant: 'error'
            })
        }
        setLoading(false)
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
                                Set Flags
                            </Typography>
                        </Grid>
                        <Grid item md={8}>
                            <TokenFlagsForm />
                        </Grid>
                        <Grid item md={4} justifyContent='flex-end' sx={{ display: 'flex' }}>
                            <Typography variant='caption' >
                                Issuer
                            </Typography>
                            <Tooltip
                                title={
                                    <Typography sx={{ color: 'white' }}>
                                        (Optional) The issuer of the token, if the sender of the account is issuing it on behalf of another account. This field must be omitted if your account is the issuer of the NFToken.
                                    </Typography>}>
                                <InfoIcon fontSize={'8px'} />
                            </Tooltip>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                placeholder='Account Address, do not set this field if you are the issuer of this NFT.'
                                variant='standard'
                                fullWidth
                                value={issuer}
                                onChange={(e) => {
                                    setIssuer(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item md={4} justifyContent='flex-end' sx={{ display: 'flex' }}>
                            <Typography variant='caption' >
                                Transfer Fee
                            </Typography>
                            <Tooltip
                                title={
                                    <Typography sx={{ color: 'white' }}>
                                        (Optional) The value specifies the tFee charged by the issuer for secondary sales of the NFToken, if such sales are allowed. Valid values for this field are between 0 and 9999 inclusive, allowing transfer rates of between 0.00% and 99.99% in increments of 0.01. If this field is provided, the transaction MUST have the tfTransferable flag enabled.
                                    </Typography>
                                }
                            >
                                <InfoIcon fontSize={'8px'} />
                            </Tooltip>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                variant='standard'
                                label='Royalty fee of secondary sales.'
                                fullWidth
                                value={tFee}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                                disabled={ // possible only tfTransferable is set
                                    (flags & tfTransferable) === 0
                                }
                                onChange={(e) => {
                                    if (!isNaN(+e.target.value) && +e.target.value < 100)
                                        setFee(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item md={4} justifyContent='flex-end' sx={{ display: 'flex' }}>
                            <Typography variant='caption' >
                                NFToken Taxon
                            </Typography>
                            <Tooltip
                                title={
                                    <Typography sx={{ color: 'white' }}>
                                        The taxon associated with the token. The taxon is generally a value chosen by the minter of the token. A given taxon can be used for multiple tokens. Taxon identifiers greater than 0xFFFFFFFF are disallowed.
                                    </Typography>
                                }
                            >
                                <InfoIcon fontSize={'8px'} />
                            </Tooltip>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                variant='standard'
                                fullWidth
                                value={NFTokenTaxon}
                                onChange={(e) => {
                                    if (!isNaN(+e.target.value) && +e.target.value < 0xFFFFFFFF)
                                        setNFTokenTaxon(+e.target.value)
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