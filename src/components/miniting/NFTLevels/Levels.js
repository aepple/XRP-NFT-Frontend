import {
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { LevelsProp } from 'utils/types';
import NumericalTrait from './NumericalTrait';

Levels.prototype = LevelsProp

export default function Levels({ levels }) {
  return (
    <Container>
      {
        levels ?
          <Grid container spacing={2} >
            {levels.map((property) => (
              <Grid item key={property.id} sx={{ width: '60%' }}>
                <NumericalTrait type={property.type} value={property.value} total={property.total} />
              </Grid>
            ))}
          </Grid> :
          <Typography>
            No properties.
          </Typography>
      }
    </Container>
  );
}
