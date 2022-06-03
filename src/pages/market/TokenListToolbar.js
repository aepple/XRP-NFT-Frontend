//import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
//import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { styled } from '@mui/material/styles';
//import { Link as RouterLink } from 'react-router-dom';
import cloudRefresh from '@iconify/icons-fontisto/cloud-refresh';
//import { fCurrency3 } from '../../utils';

import {
  Box,
  Stack,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  TablePagination
} from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

/*TokenListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};*/

export default function TokenListToolbar(props) {
  return (
    <RootStyle
      sx={{
        ...(props.numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {props.numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {props.numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={props.filterName}
          onChange={props.onFilterName}
          placeholder="Search ..."
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      {props.numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      ) : (
      	<Stack direction="row" alignItems="center">
      		<TablePagination
	            rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
	            component="div"
	            count={props.count}
	            rowsPerPage={props.rowsPerPage}
	            labelRowsPerPage={props.labelRowsPerPage}
	            page={props.page}
	            onPageChange={props.onPageChange}
	            onRowsPerPageChange={props.onRowsPerPageChange}
	        />
	        <Tooltip title="Reload">
	          <IconButton onClick={props.onCloudRefresh}>
	            <Icon icon={cloudRefresh} />
	          </IconButton>
	        </Tooltip>
	        {/* <Tooltip title="Filter">
	          <IconButton>
	            <Icon icon={roundFilterList} />
	          </IconButton>
	        </Tooltip> */}
        </Stack>
      )}
    </RootStyle>
  );
}
