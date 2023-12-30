import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Box, ChakraProvider, Flex, theme } from '@chakra-ui/react';
import { useEditStylesStore } from './stores/useEditStylesStore';
import WebFont from 'webfontloader';
import LandingPage from './Pages/landingPage/LandingPage';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import TopBar from './Components/TopBar/TopBar';
import { defaultAppStyles } from './config/defaultAppStyles';
import Album from './Pages/album/Album';
import Dots from './Photos/backgroundDots.jpg';
import Grad from './Photos/grad.jpg';
import Ocean from './Photos/ocean.jpg';

const App = () => {
  const {
    styleData,
    getMainStyles,
    getHeroBoxStyles,
    getHeroBoxBodyStyles,
    getMiddleContentBoxBodyStyles,
    getMiddleContentBoxStyles,
  } = useEditStylesStore((state: any) => state);

  useEffect(() => {
    const getStyles = async () => {
      await getMainStyles();
      await getHeroBoxStyles();
      await getHeroBoxBodyStyles();
      await getMiddleContentBoxBodyStyles();
      await getMiddleContentBoxStyles();
    };
    getStyles();
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          'Droid Sans',
          'Chilanka',
          'Roboto',
          'DM Sans',
          'Inter',
          'Space Mono',
          'Space Grotesk',
          'Work Sans',
          'Syne',
          'Libre Franklin ',
          'Cormorant',
          'Fira Sans ',
          'Eczar',
          'Alegreya Sans ',
          'Alegreya ',
          'Source Sans Pro ',
          'Source Serif Pro ',
          'Comic Neue',
          'Dancing Script',
        ],
      },
    });
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box
          minH={'100vh'}
          backgroundImage={styleData?.backgroundImage ? Dots : ''}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundColor={
            styleData?.backgroundColor ||
            defaultAppStyles.styles.backgroundColor
          }
        >
          <TopBar
            height={300}
            navNames={
              styleData?.topBarNavLinks ||
              defaultAppStyles.styles.topBarNavLinks
            }
          />

          <Flex justify={'center'}>
            <Box h={'100%'} w="1200px">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/Album" element={<Album />} />
              </Routes>
            </Box>
          </Flex>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
