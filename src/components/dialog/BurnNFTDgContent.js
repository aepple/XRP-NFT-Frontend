import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Button,
    DialogActions,
    DialogContent,
} from '@mui/material'
import XSnackbar from 'components/common/Snackbar';
import { useSnackbar } from 'hooks/useSnackbar';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import { burnToken } from 'utils/tokenActions'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom'

export default function BurnNFTDgContent({ close, NFTokenID }) {
    const { isOpen, msg, variant, openSnackbar, closeSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const account = useSelector(state => state.account.account)
    const login = useSelector(state => state.account.login)
    const handleBurn = async () => {
        if (login) {
            setLoading(true)
            try {
                await burnToken(
                    account.secret,
                    NFTokenID,
                )
                openSnackbar('Offer succeed!', 'success')
                close()
                navigate('/account')
            } catch (e) {
                openSnackbar(e.message, 'error')

            }
            setLoading(false)
        } else {
            openSnackbar('You have to log in first!', 'error')
            // navigate('/login')
        }
    }

    const handleCancel = () => {
        close()
    }

    return (
        <>
            <DialogContent dividers sx={{ backgroundColor: (theme) => (theme.palette.background.paper) }}>
                <Alert severity="warning" sx={{ backgroundColor: (theme) => (theme.palette.background.paper) }}>
                    <AlertTitle>Warning</AlertTitle>
                    You are going to permanently destroy a NFToken. In practice, the NFToken is transferred to an account that is inaccessible, rendering it irretrievable.
                </Alert>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    sx={{ padding: 1 }}
                    loading={loading}
                    loadingPosition='start'
                    startIcon={<Icon icon='ps:feedburner' />}
                    onClick={handleBurn}
                >
                    Burn
                </LoadingButton>
                <Button autoFocus onClick={handleCancel}>Cancel</Button>
            </DialogActions>
            <XSnackbar isOpen={isOpen} message={msg} variant={variant} close={closeSnackbar} />
        </>
    )
}