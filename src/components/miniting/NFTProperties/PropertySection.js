import { useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import AddTraitDgContent from './AddTraitDgContent'
import BaseDialog from 'components/dialog/BaseDialog';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux'
import Properties from './Properties';

export default function PropertySection() {
  // const [properties, setProperties] = useState([])
  const [isOpenTraitAddDg, setIsOpenTraitAddDg] = useState(false)
  const properties = useSelector(state => state.ipfs.metadata.properties)

  const openTraitAddDg = () => {
    setIsOpenTraitAddDg(!isOpenTraitAddDg)
  }

  return (
    <Stack>
      <List>
        <Box sx={{ margin: 1, padding: 1 }}>

          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete"
                onClick={openTraitAddDg}
              >
                <Icon icon="carbon:add-alt" fontSize={30} />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Icon icon="teenyicons:search-property-outline" fontSize={30} />
            </ListItemIcon>
            <ListItemText
              primary="Properties"
              secondary={'Textual traits that show up as rectangles'}
            />
          </ListItem>
          <Properties properties={properties} />
        </Box>
        <Divider />
      </List>
      <BaseDialog
        isOpen={isOpenTraitAddDg}
        close={openTraitAddDg}
        title={'Add Properties'}
        render={<AddTraitDgContent
          // save={setProperties}
          close={openTraitAddDg}
          properties={properties}
        />}
      />
    </Stack>
  );
}
