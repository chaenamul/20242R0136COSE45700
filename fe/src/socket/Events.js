import React from 'react';
import { Box, Stack } from '@mui/material'

export function Events({ events }) {
  return (
    <Stack sx={{ px: '20px' }}>
      {
        events.map((event, index) =>
          <Box key={ index }>{ event }</Box>
        )
      }
    </Stack>
  );
}