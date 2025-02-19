'use client';

import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

import Prmopt from './_components/Prompt';

export default function Page() {
  return (
    <Stack direction="column" alignItems="center" gap={2} bgcolor="#F7FBFF" width="calc(100% - 80px)" minHeight="100%" paddingY={10} paddingX={5}>
      <Grid container justifyContent="flex-end" width="100%">
        <Prmopt />
      </Grid>
    </Stack>
  );
}
