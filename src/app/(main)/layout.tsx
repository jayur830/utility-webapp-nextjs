import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    // <Stack>
    //   <ButtonGroup>
    //     <Button href="/pdf">
    //       PDF
    //     </Button>
    //   </ButtonGroup>
    //   {children}
    // </Stack>
    children
  );
}
