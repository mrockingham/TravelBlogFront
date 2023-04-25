import React, { useState } from 'react';
import { ChakraProvider, Box, theme, Button } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import HeroBox from './Components/HeroBox/HeroBox';

import TopBar from './Components/TopBar/TopBar';

export const App = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl" height="100vh">
        <TopBar />
        <Button onClick={() => setIsEdit(!isEdit)}>
          Edit Mode :{isEdit ? 'on' : 'off'}
        </Button>

        <HeroBox height={500} />
      </Box>
    </ChakraProvider>
  );
};
