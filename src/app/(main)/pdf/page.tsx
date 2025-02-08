'use client';

import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import { Card, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import {
  useEffect, useRef, useState,
} from 'react';
import ReactMarkdown from 'react-markdown';

async function getTextFromPDF(path: string) {
  const pdf = await getDocument(path).promise;
  const pages = await Promise.all(Array(pdf.numPages).fill(1).map((_, i) => pdf.getPage(i + 1)));
  const pageTexts = await Promise.all(pages.map((page) => page.getTextContent()));
  return pageTexts.map((text) => text.items.map((item) => (item as TextItem).str).join('\n')).join('\n');
}

export default function Page() {
  const [text, setText] = useState<string>();
  const [resultType, setResultType] = useState<'text' | 'markdown'>('text');

  useEffect(() => {
    GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  }, []);

  // useEffect(() => {
  //   parsePDF('/yolov5.pdf').then((contents) => {
  //     contents.forEach((content, i) => {
  //       console.log(content);
  //       setHTML((prevHtml) => [
  //         prevHtml,
  //         <div
  //           key={i}
  //           style={{
  //             position: 'relative',
  //             border: '1px solid black',
  //             width: 620,
  //             height: 770,
  //           }}
  //         >
  //           {content.items.map((it, i) => {
  //             const item = it as TextItem;
  //             return (
  //               <div
  //                 key={i}
  //                 style={{
  //                   fontSize: item.transform[0],
  //                   fontFamily: content.styles[item.fontName].fontFamily,
  //                   position: 'absolute',
  //                   left: item.transform[4],
  //                   top: 770 - item.transform[5],
  //                   // width: item.width,
  //                   // height: item.height,
  //                 }}
  //               >
  //                 {item.str}
  //               </div>
  //             );
  //           })}
  //         </div>,
  //       ]);
  //     });
  //   });
  // }, []);

  const ref = useRef<HTMLInputElement>(null);

  return (
    <Grid container direction="column" alignItems="center" bgcolor="#F7FBFF" width="100%" minHeight="100%" paddingY={10} paddingX={5}>
      <input
        ref={ref}
        hidden
        type="file"
        onChange={async (e) => {
          if (e.target.files) {
            const pdfText = await getTextFromPDF(URL.createObjectURL(e.target.files[0]));
            const response = await fetch('/api/pdf', {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain' },
              body: pdfText,
            });
            if (response.body) {
              const reader = response.body.getReader();
              const decoder = new TextDecoder();
              if (!reader) {
                return;
              }
              while (true) {
                const { value, done } = await reader.read();
                if (done) {
                  break;
                }
                const decoded = decoder.decode(value, { stream: true });
                setText((state) => state + decoded);
              }
              console.log(text);
            }
          }
        }}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          ref.current?.click();
        }}
        sx={{
          'bgcolor': '#d5e9ff',
          'maxWidth': 500,
          'height': 200,
          'borderWidth': 2,
          'borderStyle': 'dashed',
          'borderColor': 'primary.main',
          'borderRadius': 4,
          ':hover': { bgcolor: '#ebf4ff' },
        }}
      >
        <Typography color="primary">PDF 파일을 업로드하세요.</Typography>
      </Button>
      {text && (
        <Grid container direction="column" width="100%" marginTop={3}>
          <ButtonGroup>
            <Button
              variant={resultType === 'text' ? 'contained' : 'outlined'}
              onClick={() => {
                setResultType('text');
              }}
            >
              Plain Text
            </Button>
            <Button
              variant={resultType === 'markdown' ? 'contained' : 'outlined'}
              onClick={() => {
                setResultType('markdown');
              }}
            >
              Markdown
            </Button>
          </ButtonGroup>
          <Card
            sx={{
              width: 'calc(100% - 80px)',
              border: `1px solid ${grey[300]}`,
              borderRadius: 2,
              marginTop: 2,
              padding: 4,
            }}
          >
            {resultType === 'text' ? <ReactMarkdown className="markdown">{text}</ReactMarkdown> : <Typography>{text}</Typography>}
          </Card>
          <Grid container justifyContent="flex-end" width="100%">
            <IconButton onClick={() => navigator.clipboard.writeText(text)}>
              <ContentCopyOutlined />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
