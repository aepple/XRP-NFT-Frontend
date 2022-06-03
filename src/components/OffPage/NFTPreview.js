import * as React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { NFTPreviewProps } from 'utils/types';

NFTPreview.prototype = NFTPreviewProps

export default function NFTPreview({ uri, title, favorites }) {
  return (
    <Card>
      <CardHeader
        sx={{ padding: '0 30px' }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label='settings'>
              <FavoriteBorderIcon />
            </IconButton>
            <Typography variant='string'>{favorites}</Typography>
          </Box>
        }
        subheader={title}
      />
      <Divider />
      {
        uri ?
          <CardMedia
            component='img'
            image={uri}
            alt={uri}
          /> :
          <Typography variant='h6' sx={{ textAlign: 'center' }}>No Image</Typography>
      }
    </Card>
  );
}
