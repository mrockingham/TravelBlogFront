import { Box } from '@chakra-ui/react';
import React from 'react';
import HeroBox from '../../Components/HeroBox/HeroBox';
import MiddleContentBox from '../../Components/MiddleContentBox/MiddleContentBox';

const LandingPage = () => {
  return (
    <Box>
      <HeroBox height={500} />
      <MiddleContentBox />
    </Box>
  );
};

export default LandingPage;
