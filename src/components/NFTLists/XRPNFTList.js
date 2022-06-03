import { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import { BASE_URL } from 'utils/constants';
import { Box, Grid } from "@mui/material";
import XSnackbar from 'components/common/Snackbar';
import { useSnackbar } from 'hooks/useSnackbar';
import NFTCard from 'components/nftcard/NFTCard';

export const XRPNFTList = () => {

    const { isOpen, msg, variant, openSnackbar, closeSnackbar } = useSnackbar()
    const [nfTokens, setNfTokens] = useState([])
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const flags = useSelector((state) => state.filter.flag)

    const fetchImages = (nfTokensParam, offsetParam) => {
        const _nfTokens = nfTokensParam ? nfTokensParam : nfTokens
        const _offset = offsetParam === 0 ? offsetParam : offset

        axios
            .get(`${BASE_URL}/nfts?page=${_offset}&limit=20&flag=${flags}&self=true`)
            .then(res => {
                if (res.data.nfts.length < 10) {
                    setHasMore(false)
                }
                setNfTokens([..._nfTokens, ...res.data.nfts])
                openSnackbar('Fetch:' + _offset, 'success')
                setOffset(_offset + 1)
            });
        console.log(_nfTokens, _offset)
    };

    const reset = () => {
        setNfTokens([])
        setOffset(0)
        fetchImages([], 0)
    }
    useEffect(() => {
        reset()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flags]);

    return (
        <Box sx={{ mt: 1 }}>
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
            <XSnackbar isOpen={isOpen} message={msg} variant={variant} close={closeSnackbar} />
        </Box>
    );
};
