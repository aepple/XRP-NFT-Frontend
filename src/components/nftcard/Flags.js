import { Stack } from '@mui/material';
import { Icon } from '@iconify/react';

export default function FlagsContainer({ Flags }) {

  return (
    <Stack direction='row' alignItems='center' justifyContent='start' sx={{ fontSize: 20, gap: 2 }}>
      {(Flags & 0x00000001) !== 0 && <Icon icon='ps:feedburner' />}
      {(Flags & 0x00000002) !== 0 && <Icon icon="teenyicons:ripple-solid" />}
      {(Flags & 0x00000004) !== 0 && <Icon icon='codicon:workspace-trusted' />}
      {(Flags & 0x00000008) !== 0 && <Icon icon='mdi:transit-transfer' />}
    </Stack>
  );
}
