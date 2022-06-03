import { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import { BASE_URL } from 'utils/constants';
import { Grid } from "@mui/material";
import { useSnackbar } from 'notistack';
import NFTCard from 'components/nftcard/NFTCard';

export const AllNFTs = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [nfTokens, setNfTokens] = useState([])
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const flags = useSelector((state) => state.filter.flag)

    const fetchImages = (nfTokensParam, offsetParam) => {
        const _nfTokens = nfTokensParam ? nfTokensParam : nfTokens
        const _offset = offsetParam === 0 ? offsetParam : offset
        axios
            .get(`${BASE_URL}/nfts?page=${_offset}&limit=20&flag=${flags}&self=false`)
            .then(res => {
                if (res.data.nfts.length < 10) {
                    setHasMore(false)
                }
                setNfTokens([..._nfTokens, ...res.data.nfts])
                enqueueSnackbar('Fetch:' + _offset, {
                    variant: 'success'
                })
                setOffset(_offset + 1)
            });
    };

    // const fetchNFTokens = async () => {
    //     try {
    //         // const res = await axios.get(`${BASE_URL}/nfts/${offset}`)
    //         const res = await axios.get(`${BASE_URL}/nfts?page=${offset}&limit=20&flag=${flags}`)
    //         // setIsLoaded(true);
    //         if (res.data.nfts.length < 10) // if this is the last page, no more request to server
    //             setHasMore(false)
    //         dispatch(addNfts(res.data.nfts))
    //         dispatch(increaseOffset())
    //         openSnackbar('Fetch:' + offset, 'success')
    //     } catch (e) {
    //         // use snack bar here
    //         openSnackbar(e.message, 'error')
    //     }
    // }

    const reset = () => {
        setNfTokens([])
        setOffset(0)
        fetchImages([], 0)
    }
    useEffect(() => {
        reset()
        setHasMore(true)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flags]);

    return (
        <div>
            <InfiniteScroll
                dataLength={nfTokens.length}
                next={() => fetchImages()}
                hasMore={hasMore}
                loader={<p>loading...</p>}
            >
                <Grid container spacing={2} justifyContent='center'>
                    {
                        nfTokens.map((nft) => (
                            <Grid item key={nft.NFTokenID}
                            >
                                <NFTCard
                                    Flags={nft.Flags}
                                    Issuer={nft.Issuer}
                                    URI={nft.URI}
                                    NFTokenID={nft.NFTokenID}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </InfiniteScroll>
        </div>
    );
};
