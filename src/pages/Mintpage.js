import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import React from 'react';
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Page from 'components/Page';
import { NFTUploader } from 'components/miniting/NFTUploader';
import { SUPPORTED_FILE_TYPES, XRPNFT_DOMAIN } from 'utils/constants';
import { useNavigate } from 'react-router-dom'
import CollectionAndProperties from 'components/miniting/CollectionAndProperties';
import BaseDialog from 'components/dialog/BaseDialog';
import NFTokenMintDgContent from 'components/dialog/NFTokenMintDgContent';

export default function Minting() {

  const navigate = useNavigate()
  const levels = useSelector(state => state.ipfs.metadata.levels)
  const properties = useSelector(state => state.ipfs.metadata.properties)
  const [open, setOpen] = useState(false)
  const pinnedFileHash = useSelector(state => state.ipfs.pinnedFileHash)
  const login = useSelector(state => state.account.login)
  const [nftName, setNftName] = useState('')
  const [extLink, setExtLink] = useState('xrpnft.com')
  const [description, setDescription] = useState('')



  useEffect(() => {
    if (!login)
      navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login])
  return (
    <Page title='Create - XRPL NFT'>
      <Container maxWidth='md' sx={{ marginBottom: '3vh' }}>
        <Stack spacing={2} marginBottom={3}>
          <Typography variant="h4" >
            Create New Item
          </Typography>
          <Typography variant='caption'>
            Image, Video, Audio, or 3D Model
          </Typography>
          <Typography variant='body1'>
            File types supported: {SUPPORTED_FILE_TYPES.join(', ')}. Max size: 100MB
          </Typography>
          <NFTUploader />
          <Typography variant='body1'>
            Image on IPFS:  {pinnedFileHash}
          </Typography>
        </Stack>
        <Stack spacing={2} marginBottom={3}>
          <Typography variant='caption'>Name</Typography>
          <TextField required placeholder='Item name' margin='dense'
            onChange={(e) => {
              setNftName(e.target.value)
            }}
            value={nftName}
            sx={{
              '&.MuiTextField-root': {
                marginTop: 1
              }
            }} />
        </Stack>
        <Stack spacing={2} marginBottom={3}>
          <Typography variant='caption'>External link</Typography>
          <Typography variant='body1'>
            {'This site will include a link to this URL on this item\'s detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.'}
          </Typography>
          <TextField
            placeholder={extLink}
            margin='dense'
            onChange={(e) => {
              setExtLink(e.target.value)
            }}
            value={extLink}
            sx={{
              '&.MuiTextField-root': {
                marginTop: 1
              }
            }} />
        </Stack>
        <Stack spacing={2} marginBottom={3}>
          <Typography variant='caption' >Description</Typography>
          <Typography variant='body1'>
            {'The description will be included on the item\'s detail page underneath its image. Markdown syntax is supported.'}
          </Typography>
          <TextField
            placeholder='Provide a detailed description of your item'
            margin='dense'
            multiline
            maxRows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            sx={{
              '&.MuiTextField-root': {
                marginTop: 1,
                minHeight: 10
              },
              '& .MuiOutlinedInput-root': {
                height: 100,
                alignItems: 'start'
              }
            }} />
        </Stack>
        <CollectionAndProperties />
        <Button
          sx={{ margin: 1, padding: 1 }}
          onClick={() => setOpen(true)}
          variant='contained'
        >
          Create
        </Button>
      </Container>
      <BaseDialog
        isOpen={open}
        close={() => { setOpen(false) }}
        title={'Mint New NFT'}
        maxWidth={'md'}
        render={<NFTokenMintDgContent
          close={() => { setOpen(false) }}
          metadata={
            {
              image: XRPNFT_DOMAIN + pinnedFileHash,
              name: nftName,
              type: 'image',
              description: description,
              externalLink: extLink,
              levels: levels,
              properties: properties,
            }
          }
        />}
      />
    </Page >
  );
}
