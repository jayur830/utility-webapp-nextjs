'use client';

import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useActionState } from 'react';

function convert(query: string) {}

export default function Prmopt() {
  const [state, submitAction, isPending] = useActionState<string, FormData>(async (_, formData) => {
    const query = formData.get('query') as string;
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return query;
  }, '');

  console.log('isPending:', isPending);

  return (
    <Card
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 500,
        border: `1px solid ${grey[300]}`,
        borderRadius: 2,
        padding: 2,
      }}
    >
      <form action={submitAction}>
        <TextField
          fullWidth
          multiline
          name="query"
          minRows={4}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={1} marginTop={1}>
          <Button variant="outlined" type="reset">
            RESET
          </Button>
          <Button variant="contained" type="submit">OK</Button>
        </Stack>
      </form>
      {isPending && (
        <>
          <Box position="absolute" top={0} left={0} bgcolor="common.white" width="100%" height="100%" sx={{ opacity: 0.7 }} />
          <Box position="absolute" top={0} left={0} display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
            <CircularProgress />
          </Box>
        </>
      )}
    </Card>
  );
}
