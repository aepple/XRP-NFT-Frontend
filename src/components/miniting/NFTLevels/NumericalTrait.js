import React from 'react';
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import { LevelProps } from 'utils/types';
import LinearProgress from '@mui/material/LinearProgress';

NumericalTrait.propTypes = LevelProps

export default function NumericalTrait({ type, value, total }) {
  return (
    <Paper sx={{
      // width: 600,
      borderRadius: '6px',
      border: '1px solid #00ff7f',
      padding: 2,
      paddingBottom: 1,
      textAlign: 'center',
      background: '#00ff7f10'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ textTransform: 'uppercase', color: 'springgreen', fontWeight: 500, fontSize: 11 }}>
          {type}
        </Typography>
        <Typography variant='body1' sx={{ fontSize: 15 }}>
          {value} of {total}
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={value / total * 100} sx={{ height: 10, borderRadius: 5 }} />
    </Paper>
  );
}
