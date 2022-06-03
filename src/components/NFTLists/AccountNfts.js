import { Container, Grid, Typography } from "@mui/material";
import NFTCard from 'components/nftcard/NFTCard';
import useSWR from 'swr';
import { fetcher } from 'utils/utils';

// https://ws.xrpnft.com/api/account/nfts/rH6jr16vArKBneg2Hzy1bgC9ewdMReYavH

export default function AccountNfts({ account }) {
    const { data, error } = useSWR('https://ws.xrpnft.com/api/account/nfts/' + account, fetcher)
    // const [nfts, setNFTs] = useState([])
    // const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true)
    //         try {
    //             const nfts_result = await getTokens(account)
    //             setNFTs(nfts_result.account_nfts)
    //             console.log({ nfts_result })
    //         } catch (e) {
    //             console.log(e)
    //             enqueueSnackbar(e.message, {
    //                 variant: 'error'
    //             })
    //         }
    //         setLoading(false)
    //     }

    //     fetchData()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [account])
    if (error) return <Typography variant='caption'>{JSON.stringify(error)}</Typography>
    if (!data) return <Typography variant='caption'>Loading...</Typography>
    return (
        <Container sx={{ marginTop: 2 }} maxWidth={false}>
            {
                <Grid container spacing={2} justifyContent='center'>
                    {
                        data.data.nfts.map((nft) => (
                            <Grid item
                                key={nft.NFTokenID}
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
            }
        </Container>
    );
}
