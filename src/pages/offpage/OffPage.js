import { useParams } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import Page from 'components/Page';
import NFTOffersDetail from 'components/OffPage/NFTOffersDetail';
import NFTDetails from 'components/OffPage/NftDetails';
import { fetcher, parseNFTUri } from 'utils/utils';
import useSWR from 'swr'
import Page404 from 'pages/Page404';
import { getNFTokenInfoNew } from 'utils/utils';
const xrpl = require("xrpl");

export default function NFTInfo() {
  const { tokenID, tokenURI } = useParams()

  const nft = xrpl.parseNFTokenID(tokenID)
  const uri = parseNFTUri(tokenURI)
  const { data, error } = useSWR(uri, fetcher)

  const metadata = getNFTokenInfoNew(data, uri)

  if (error) return <Page404 />
  if (!data) return <Typography variant='body1'>Loading...</Typography>
  return (
    <Page title='NFT Info'>
      <Container maxWidth='lg' sx={{ marginTop: '1vh' }}>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item md={5}>
            {
              metadata &&
              <NFTDetails NFTokenID={tokenID} NFToken={nft} ParsedURI={uri} data={metadata} />
            }
          </Grid>
          <Grid item md={7}>
            <NFTOffersDetail NFTokenID={tokenID} name={metadata.description?.name} Issuer={nft.Issuer} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
