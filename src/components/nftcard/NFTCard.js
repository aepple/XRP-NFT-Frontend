import { useEffect, useState } from 'react';
import { NFTCardProps } from 'utils/types';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Link,
  Skeleton,
} from '@mui/material';
import { Icon } from '@iconify/react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlagsContainer from './Flags';
import { getNFTokenInfo } from 'utils/utils';
// import PriceContainer from './Price';


NFTCard.propTypes = NFTCardProps

export default function NFTCard({
  Flags,
  Issuer,
  NFTokenID,
  URI,
}) {
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    let mounted = true

    const getImgUrl = async () => {
      setLoading(true)

      const res = await getNFTokenInfo(URI)
      if (mounted)
        setImgUrl(res.image)

      setLoading(false)
    }
    getImgUrl()

    return () => {
      mounted = false
    }
  }, [URI])

  return (
    <Link href={`/nft/${NFTokenID}/${URI}`} underline='none'>
      <Card sx={{ width: 300 }}>
        {
          !loading
            ?
            <CardMedia
              component='img'
              image={imgUrl}
              // image='/static/cover.jpg'
              alt={imgUrl}
              sx={{ height: 300, width: 300 }}
            />
            :
            <Skeleton animation='wave' variant='rectangular' width={300} height={300} />
        }
        <CardContent sx={{ padding: 1, flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
          <FlagsContainer Flags={Flags} />
          {/* <PriceContainer price={2000} /> */}
        </CardContent>
        <Divider />
        <CardActions sx={{ alignItems: 'space-evenly' }}>
          <IconButton aria-label='buy'>
            <Icon icon="bxs:cart-alt" />
          </IconButton>
          <IconButton aria-label='share'>
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
}
