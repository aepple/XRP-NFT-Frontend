import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material'

export default function NFTDetailsDescription({
    description,
}) {

    return (
        description ?
            <List>
                {
                    Object.keys(description).map((item, index) => (
                        <Box key={item + '-' + index}>
                            <ListItem >
                                <ListItemText primary={
                                    <Typography variant='caption'>
                                        {item}
                                    </Typography>
                                }
                                    secondary={JSON.stringify(description[item])}
                                />
                            </ListItem>
                            <Divider component='li' orientation='horizontal' />
                        </Box>
                    ))
                }
            </List>
            :
            <Typography sx={{ textAlign: 'center' }}>No description for this item</Typography>
    );
}
