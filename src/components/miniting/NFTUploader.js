import { Card, Stack } from '@mui/material';
import styled from 'styled-components';
import { useState, useRef } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux'
import { setPinnedFileHash } from 'app/slices/ipfSlice';
import axios from 'axios'
import FormData from 'form-data';
import { PINATA_PINNING_FILE_URL } from 'utils/constants';
import XSnackbar from 'components/common/Snackbar';
import { useSnackbar } from 'hooks/useSnackbar';


export const NFTUploader = () => {

    const { isOpen, msg, variant, openSnackbar, closeSnackbar } = useSnackbar()
    const fileRef = useRef();
    const [fileUrl, setFileUrl] = useState(null)
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleFileSelect = (e) => {
        const pickedFile = e.target.files[0]

        const reader = new FileReader()
        if (pickedFile) {
            setFile(pickedFile)

            // This is used as src of image
            reader.readAsDataURL(pickedFile)
            reader.onloadend = function (e) {
                setFileUrl(reader.result)
            }
        }
    }

    const pinFileToIPFS = async () => {

        // TODO: Called only when the file is uploaded to site.
        setLoading(true)
        if (file) {
            try {
                const formData = new FormData()
                formData.append("file", file)
                console.log('uploading image to ipfs')
                const response = await axios.post(
                    PINATA_PINNING_FILE_URL,
                    formData,
                    {
                        maxContentLength: "Infinity",
                        headers: {
                            "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
                            'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
                            'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY
                        }
                    }
                )
                dispatch(setPinnedFileHash(response.data.IpfsHash))
                openSnackbar('IPFSHash: ' + response.data.IpfsHash, 'success')
            } catch (e) {
                console.log(e)
                openSnackbar(e.message, 'error')
            }
        }
        setLoading(false)
    }

    const handleResetFile = (e) => {
        e.stopPropagation()
        setFileUrl(null)
        fileRef.current.value = null
    }

    return (
        <CardWrapper>
            <input
                ref={fileRef}
                style={{ display: 'none' }}
                // accept='image/*,video/*,audio/*,webgl/*,.glb,.gltf'
                accept='image/*'
                id='contained-button-file'
                multiple
                type='file'
                onChange={handleFileSelect}
            />
            <Card
                sx={{
                    display: 'flex',
                    width: 320,
                    height: 240,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'auto',
                    position: 'relative'
                }}
            >
                <CardOverlay
                    onClick={() => fileRef.current.click()}
                >
                    <IconButton
                        aria-label='close' onClick={(e) => handleResetFile(e)}
                        sx={fileUrl ? { position: 'absolute', right: '1vw', top: '1vh' } : { display: 'none' }}
                    >
                        <CloseIcon color='white' />
                    </IconButton>
                </CardOverlay>
                <img src={fileUrl} alt='' style={fileUrl ? {objectFit:'cover', height: '100%', overflow:'hidden'} : { display: 'none' }} />
                <ImageIcon fontSize='large' sx={fileUrl ? { display: 'none' } : {width: 100, height: 100}} />
            </Card>
            <Stack>
                <LoadingButton
                    loading={loading}
                    loadingPosition='start'
                    startIcon={<SendIcon />}
                    onClick={pinFileToIPFS}
                >
                    Upload
                </LoadingButton>
            </Stack>
            <XSnackbar isOpen={isOpen} message={msg} variant={variant} close={closeSnackbar} />
        </CardWrapper>
    )
}

const CardWrapper = styled.div`
    border: dashed 3px;
    border-radius: 5px;
    padding: 5px;
    width: fit-content;
    &:hover {
        cursor: pointer;
    }
`

const CardOverlay = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: black;
  inset: 0;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.5s;
  &:hover {
    opacity: 0.6;
  }
  }
`