import React from 'react';
import AlbumComponent from '../../Components/album/AlbumComponent';
import { Box, Text, Center } from '@chakra-ui/react';
import FileUpload from '../../Components/FileUpload';

const Album = () => {
  return (
    <Box>
      <Box>
        <Center>
          <Text fontSize={{ base: '24px', md: '40px', lg: '56px' }}>
            Our Gallery
          </Text>
        </Center>
        <FileUpload />
        <AlbumComponent />
      </Box>
    </Box>
  );
};

export default Album;
