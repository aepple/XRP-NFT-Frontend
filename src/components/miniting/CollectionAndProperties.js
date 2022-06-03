import { useState } from 'react';
import {
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PropertySection from './NFTProperties/PropertySection';
import LevelsSection from './NFTLevels/LevelSection';

export default function CollectionAndProperties() {
  const [collectionName, setCollectionName] = useState('')
  const handleCollectionFieldChange = (e) => {
    setCollectionName(e.target.value)
  }


  return (
    <Stack>
      <Typography variant='caption' >Collection</Typography>
      <Typography variant='body1'>
        This is the collection where your item will appear.
      </Typography>
      <TextField required placeholder='Item name' margin='dense'
        onChange={handleCollectionFieldChange}
        value={collectionName}
        sx={{
          '&.MuiTextField-root': {
            marginTop: 1
          }
        }} />
      <PropertySection />
      <LevelsSection />
    </Stack>
  );
}
