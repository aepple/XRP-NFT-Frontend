import {
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Trait from './Trait';

export default function Properties({ properties }) {

  return (
    <Container>
      {
        properties ?
          <Grid container spacing={2} >
            {properties.map((property) => (
              <Grid item key={property.id}>
                <Trait type={property.type} value={property.value} />
              </Grid>
            ))}
          </Grid> :
          <Typography>
            No properties.
          </Typography>}
    </Container>
  );
}
