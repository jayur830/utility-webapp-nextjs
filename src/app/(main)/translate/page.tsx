'use client';

import { ArrowRightAltSharp } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem, Select, TextField,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

// 프로그래밍 언어 목록
const devLangList = [
  {
    label: 'C',
    value: 'c',
  },
  {
    label: 'C++',
    value: 'cpp',
  },
  {
    label: 'C#',
    value: 'csharp',
  },
  {
    label: 'Go',
    value: 'go',
  },
  {
    label: 'Java',
    value: 'java',
  },
  {
    label: 'JavaScript',
    value: 'javascript',
  },
  {
    label: 'TypeScript',
    value: 'typescript',
  },
  {
    label: 'Kotlin',
    value: 'kotlin',
  },
  {
    label: 'Python',
    value: 'python',
  },
  {
    label: 'Ruby',
    value: 'ruby',
  },
  {
    label: 'Rust',
    value: 'rust',
  },
  {
    label: 'Swift',
    value: 'swift',
  },
];

export default function Page() {
  const [from, setFrom] = useState('c');
  const [fromCode, setFromCode] = useState<string>('');
  const [to, setTo] = useState('c++');
  const [toCode, setToCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Stack direction="column" alignItems="center" gap={2} bgcolor="#F7FBFF" width="calc(100% - 80px)" minHeight="100%" paddingY={10} paddingX={5}>
      <Stack direction="row" alignItems="center" gap={3} width="100%" maxWidth={1440}>
        <Select fullWidth value={from} onChange={(e) => setFrom(e.target.value)} sx={{ bgcolor: 'common.white' }}>
          {devLangList.map(({ label, value }, i) => <MenuItem key={i} value={value}>{label}</MenuItem>)}
        </Select>
        <ArrowRightAltSharp />
        <Select fullWidth value={to} onChange={(e) => setTo(e.target.value)} sx={{ bgcolor: 'common.white' }}>
          {devLangList.map(({ label, value }, i) => <MenuItem key={i} value={value}>{label}</MenuItem>)}
        </Select>
      </Stack>
      <Stack direction="row" alignItems="center" gap={5} width="100%" maxWidth={1440}>
        <Box flex={1}>
          <TextField
            fullWidth
            multiline
            minRows={20}
            value={fromCode}
            onChange={(e) => {
              setFromCode(e.target.value);
            }}
            sx={{ bgcolor: 'common.white' }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={async () => {
            setLoading(true);
            try {
              const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  from: devLangList.find((lang) => lang.value === from)?.label,
                  to: devLangList.find((lang) => lang.value === to)?.label,
                  code: fromCode,
                }),
              });
              if (response.ok) {
                const result = await response.json();
                const content = result.choices[0]?.message?.content || '';
                if (!content) {
                  throw new Error('Failed to convert');
                }
                setToCode(content);
              }
              else {
                throw new Error('Failed to convert');
              }
            }
            catch {
              alert('Please write code in the correct format.');
            }
            finally {
              setLoading(false);
            }
          }}
          sx={{
            height: '60%',
            padding: 5,
          }}
        >
          Convert
        </Button>
        <Box position="relative" flex={1}>
          <TextField fullWidth multiline minRows={20} value={toCode} slotProps={{ input: { readOnly: true } }} sx={{ bgcolor: 'common.white' }} />
          {loading && (
            <>
              <Box position="absolute" top={0} bgcolor="common.white" width="100%" height="100%" borderRadius={1} sx={{ opacity: 0.7 }} />
              <Box position="absolute" top={0} display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
                <CircularProgress />
              </Box>
            </>
          )}
        </Box>
      </Stack>
    </Stack>
  );
}
