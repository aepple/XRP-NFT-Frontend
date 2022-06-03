import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import sidebarConfig from './SidebarConfig';
import { Divider, Link } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function DropdownExpore() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Explore
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          sidebarConfig.map((item) => (
            <MenuItem onClick={handleClose} key={item.id}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <Link href={item.path} underline='none' color={'text.secondary'}>{item.title}</Link>
              <Divider />
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  );
}
