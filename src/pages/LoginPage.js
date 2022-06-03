import { useEffect } from 'react';
import React from 'react';
import {
  Container, Typography,
} from '@mui/material';
import Page from 'components/Page';
import ChooseAccountDgContent from 'components/dialog/ChooseAccountDgContent';

export default function LoginPage() {

  useEffect(() => {
  }, [])
  return (
    <Page title='Login - XRPL NFT'>
      <Container maxWidth='md' sx={{ marginTop: '3vh', justifyContent:'center', alignItems:'center' }}>
          <Typography variant='subtitle'>Select an account</Typography>
          <ChooseAccountDgContent />
      </Container>
    </Page >
  );
}
