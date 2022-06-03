import React from 'react';
import {
  Paper,
  Typography,
} from '@mui/material';

export default function Trait({ type, value }) {
  return (
    <Paper sx={{
      width: 100,
      borderRadius: '6px',
      border: '1px solid #00ff7f',
      padding: '10px',
      textAlign: 'center',
      background: '#00ff7f10'
    }}>
      <Typography sx={{ textTransform: 'uppercase', color: 'springgreen', fontWeight: 500, fontSize: 11 }}>
        {type}
      </Typography>
      <Typography variant='body1' sx={{fontSize: 15}}>
        {value}
      </Typography>
    </Paper>
  );
}
