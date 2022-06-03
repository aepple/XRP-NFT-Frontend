import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Link,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArticleIcon from '@mui/icons-material/Article';
import { Icon } from '@iconify/react';
import NFTPreview from './NFTPreview';
import { NFTDetailsProps } from 'utils/types';
import FlagsContainer from 'components/nftcard/Flags';
import NFTDetailsDescription from './NftDetailsDescription';
import Properties from 'components/miniting/NFTProperties/Properties';
import Levels from 'components/miniting/NFTLevels/Levels';


NFTDetails.propTypes = NFTDetailsProps

export default function NFTDetails({
    NFTokenID,
    NFToken,
    ParsedURI,
    data
}) {

    return (
        <Box >
            {/* NFT Preview image start--- */}
            {data.image &&
                <NFTPreview uri={data.image} title={data.description?.name} favorites={0} />
            }
            {/* NFT Preview image end--- */}

            {/* NFT Detail info start--- */}
            <Accordion sx={{ marginTop: 2 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel3a-content'
                    id='panel3a-header'
                >
                    <Stack spacing={2} direction='row'>
                        <ArticleIcon />
                        <Typography variant='string' >Details</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        overflow: 'hidden'
                    }}
                >
                    <List>
                        {
                            Object.keys(NFToken).map((key, idx) => (

                                <ListItem key={idx} divider>
                                    {
                                        key === 'Flags' ?
                                            <Box>
                                                <Typography variant='caption'>Flags</Typography>
                                                <FlagsContainer Flags={NFToken[key]} />
                                            </Box> :
                                            <ListItemText primary={
                                                <Typography variant='caption'>
                                                    {key}
                                                </Typography>
                                            }
                                                secondary={
                                                    key === 'Issuer' ?
                                                        <Link
                                                            underline='hover'
                                                            href={`/account/${NFToken.Issuer}`}
                                                            variant='info'
                                                            sx={{ marginRight: 0, overflowWrap: 'anywhere' }}
                                                        >
                                                            {NFToken.Issuer}
                                                        </Link> :
                                                        JSON.stringify(NFToken[key])
                                                }
                                            />
                                    }
                                </ListItem>
                            ))
                        }
                        <ListItem divider>
                            <ListItemText primary={
                                <Typography variant='caption'>
                                    URI
                                </Typography>
                            }
                                secondary={
                                    <Link underline='hover'
                                        href={ParsedURI}
                                        variant='info'
                                        id='uri-link'
                                        sx={{ marginRight: 0, overflowWrap: 'anywhere' }}
                                    >
                                        {ParsedURI}
                                    </Link>}
                            />
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            {/* NFT Detail info end--- */}


            {/* NFT Properties start--- */}
            {
                data.description?.properties &&
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel2a-content'
                        id='panel2a-header'
                    >
                        <Stack spacing={2} direction='row'>
                            <Icon icon='majesticons:checkbox-list-detail-line' fontSize={25} />
                            {/* <MoreIcon /> */}
                            <Typography variant='string' >Properties</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Properties properties={data.description?.properties} />
                    </AccordionDetails>
                </Accordion>
            }
            {/* NFT Properties end--- */}

            {/* NFT Leveled Properties start--- */}
            {
                data.description?.levels &&
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel2a-content'
                        id='panel2a-header'
                    >
                        <Stack spacing={2} direction='row'>
                            <Icon icon='majesticons:checkbox-list-detail-line' fontSize={25} />
                            {/* <MoreIcon /> */}
                            <Typography variant='string' >Level Properties</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Levels levels={data.description?.levels} />
                    </AccordionDetails>
                </Accordion>
            }
            {/* NFT Leveled Properties end--- */}

            {/* NFT Description start--- */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='description-content'
                    id='description-header'
                >
                    <Stack spacing={2} direction='row'>
                        <DescriptionIcon />
                        <Typography variant='string' >Description</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ overflow: 'auto' }}>
                    {
                        <NFTDetailsDescription description={data.description} />
                    }
                </AccordionDetails>
            </Accordion>
            {/* NFT Description end--- */}

        </Box>
    );
}
