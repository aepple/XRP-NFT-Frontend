import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { AddLevelDgProp } from 'utils/types';
import { setMetadata, updateLevel } from 'app/slices/ipfSlice';
import { useDispatch, useSelector } from 'react-redux'


AddLevelDgContent.propTypes = AddLevelDgProp

export default function AddLevelDgContent({
  close,
}) {
  const dispatch = useDispatch()
  const levels = useSelector(state => state.ipfs.metadata.levels)

  const addTraitItem = () => {
    const item = {
      id: uuidv4(),
      type: '',
      value: 2,
      total: 5,
    }
    dispatch(setMetadata({ levels: [...levels, item] }))
  }

  const deleteItem = (id) => {
    dispatch(setMetadata({ levels: levels.filter((item => item.id !== id)) }))
  }

  const handleValueChange = (e, id) => {
    const idx = levels.findIndex(item => item.id === id)
    if (!isNaN(+e.target.value) && +e.target.value <= levels[idx].total) // only number and smaller than total
      dispatch(updateLevel({ value: { value: +e.target.value }, idx }))
  }

  const handleTotalChange = (e, id) => {
    const idx = levels.findIndex(item => item.id === id)
    if (!isNaN(+e.target.value)) // only number
      dispatch(updateLevel({ value: { total: +e.target.value }, idx }))
  }

  const handleTypeChange = (e, id) => {
    const idx = levels.findIndex(item => item.id === id)
    dispatch(updateLevel({ value: { type: e.target.value }, idx }))
  }



  return (
    <Container >
      <Typography variant='body1'>
        Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
      </Typography>
      <List>
        <ListItem sx={{ justifyContent: 'space-between' }}>
          <Typography variant='caption' sx={{ marginLeft: 10 }}>Type</Typography>
          <Typography variant='caption' sx={{ marginRight: 10 }}>Value</Typography>
        </ListItem>
        {
          levels && levels.map((trait) => (
            <ListItem sx={{ justifyContent: 'space-between', gap: 1 }} key={trait.id}>
              <IconButton edge='start' aria-label='delete'
                onClick={() => { deleteItem(trait.id) }}
                itemID={trait.id}
              >
                <Icon icon='akar-icons:cross' />
              </IconButton>
              <TextField
                id='outlined-basic'
                variant='outlined'
                sx={{ width: '100%' }}
                value={trait.type}
                onChange={e => handleTypeChange(e, trait.id)}
              />
              <TextField
                id='outlined-basic'
                variant='outlined'
                value={trait.value}
                sx={{ maxWidth: 50 }}
                onChange={e => handleValueChange(e, trait.id)}
              />
              <Typography variant='h5'> of </Typography>
              <TextField
                id='outlined-basic'
                sx={{ maxWidth: 50 }}
                variant='outlined'
                value={trait.total}
                onChange={e => handleTotalChange(e, trait.id)}
              />
            </ListItem>
          ))
        }
        <ListItem >
          <IconButton edge='start' aria-label='delete'
            onClick={addTraitItem}
          >
            <Icon icon='carbon:add-alt' />
          </IconButton>
        </ListItem>
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 2 }}>
        <Button
          variant='contained'
          sx={{
            background: 'springgreen',
            height: 50
          }}
          onClick={close}
        >
          Close
        </Button>
      </Box>
    </Container>
  );
}
