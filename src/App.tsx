import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box, Center, ChakraProvider, Flex, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useEditStylesStore } from './stores/useEditStylesStore';
import LandingPage from './Pages/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import TopBar from './Components/TopBar/TopBar';
import Album from './Pages/Album';
import { defaultAppStyles } from './config/defaultAppStyles';

export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });

  const { styleData, getStyles, createStyle } = useEditStylesStore(
    (state: any) => state
  );

  useEffect(() => {
    getStyles();
  }, [getStyles]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <TopBar
          height={300}
          navNames={
            styleData[0]?.topBarNavLinks || defaultAppStyles.topBarNavLinks
          }
        />
        <Flex justify={'center'}>
          <Box w="1200px">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Sign-up" element={<Register />} />
              <Route path="/Album" element={<Album />} />
            </Routes>
          </Box>
        </Flex>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
