import { Box, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

export default function PriceContainer({ price }) {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
      <Icon icon="teenyicons:ripple-solid" />
      <Typography sx={{ color: 'lightblue' }}>{price}</Typography>
    </Box>
  );
}
