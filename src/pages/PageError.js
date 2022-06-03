import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { ErrorPageProps } from 'utils/types';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

PageError.prototype = ErrorPageProps

export default function PageError({ message }) {
  return (
    <RootStyle title="Error">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h6" paragraph>
            {message}
          </Typography>

          <Box
            component="img"
            src="/static/404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Home
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
