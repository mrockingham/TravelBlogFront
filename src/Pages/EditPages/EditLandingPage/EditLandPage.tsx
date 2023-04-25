import { Box } from '@chakra-ui/react';
import React from 'react';
import TopBar from '../../../Components/TopBar/TopBar';
import HeroBox from '../../../Components/HeroBox/HeroBox';

type Props = {};

const EditLandPage = (props: Props) => {
  return (
    <div>
      {' '}
      <Box textAlign="center" fontSize="xl" height="100vh">
        <TopBar />

        <HeroBox height={500} />
      </Box>
    </div>
  );
};

export default EditLandPage;
