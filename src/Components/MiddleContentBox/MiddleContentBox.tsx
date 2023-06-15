import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
  Image,
  Center,
} from '@chakra-ui/react';

import { useUsersStore } from '../../stores/useUsersStore';
import { EditIcon } from '@chakra-ui/icons';
import { defaultAppStyles } from '../../config/defaultAppStyles';
import { useEditStylesStore } from '../../stores/useEditStylesStore';
import parse from 'html-react-parser';
import EditMiddleContentBox from '../EditMiddleContentBox/EditMiddleContentBox';

const MiddleContentBox = () => {
  const { data, getUsers, error, editMode, isEditMode } = useUsersStore(
    (state: any) => state
  );
  const { styleData, getStyles } = useEditStylesStore((state: any) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState();

  const fontSize = () => {
    if (styleData[0]?.heroBox?.bodyTextSize === 'sm') {
      return { base: '8px', md: '13.33px', lg: '18.67px' };
    } else if (styleData[0]?.heroBox?.bodyTextSize === 'md') {
      return { base: '16px', md: '26.67px', lg: '37.33px' };
    } else if (styleData[0]?.heroBox?.bodyTextSize === 'lg') {
      return { base: '24px', md: '40px', lg: '56px' };
    }
  };
  return (
    <Box>
      {editMode && (
        <Flex justifyContent={'center'}>
          <EditIcon
            onClick={() => {
              onOpen();
            }}
          />
        </Flex>
      )}
      <Flex
        justifyContent={
          styleData[0]?.MiddleContentBox?.headerAlign ||
          defaultAppStyles?.MiddleContentBox.headerAlign
        }
      >
        {/* Header Text */}
        <Text
          color={
            styleData[0]?.MiddleContentBox?.headerTextColor ||
            defaultAppStyles?.MiddleContentBox.headerTextColor
          }
          fontSize={{ base: '24px', md: '40px', lg: '56px' }}
          fontWeight={'bold'}
          style={{
            fontFamily: `${
              styleData[0]?.MiddleContentBox?.headerFontStyle ||
              defaultAppStyles?.MiddleContentBox.headerFontStyle
            }`,
          }}
        >
          {(parse(
            styleData[0]?.MiddleContentBox?.headerText ||
              defaultAppStyles?.MiddleContentBox.headerText
          ) as string) ||
            defaultAppStyles?.MiddleContentBox.headerText ||
            ''}
        </Text>
      </Flex>
      {/* Body Text */}
      <Flex
        mt={10}
        // pt={}
        justifyContent={
          styleData[0]?.MiddleContentBox?.bodyTextAlign ||
          defaultAppStyles?.MiddleContentBox.bodyTextAlign
        }
      >
        <Text
          color={
            styleData[0]?.MiddleContentBox?.bodyTextColor ||
            defaultAppStyles?.MiddleContentBox.bodyTextColor
          }
          fontSize={
            fontSize() || defaultAppStyles?.MiddleContentBox.bodyTextSize
          }
          fontWeight={'bold'}
        >
          {styleData[0]?.MiddleContentBox?.bodyText ||
            defaultAppStyles?.MiddleContentBox.bodyText}
        </Text>
      </Flex>

      <Flex justifyContent={'space-around'}>
        <Box>
          <Image
            h={{ base: '200px', md: '400px', lg: '500px' }}
            w={{ base: '200px', md: '400px', lg: '500px' }}
            // onClick={() => {
            //   setImage(image.image);
            //   onOpen();
            // }}
            // key={image.name}
            //   boxSize="150px"
            objectFit="cover"
            src={
              styleData[0]?.MiddleContentBox?.backgroundImage1 ||
              defaultAppStyles?.MiddleContentBox.backgroundImage1
            }
            alt=""
          />
        </Box>
        <Box>
          <Image
            h={{ base: '200px', md: '400px', lg: '500px' }}
            w={{ base: '200px', md: '400px', lg: '500px' }}
            // onClick={() => {
            //   setImage(image.image);
            //   onOpen();
            // }}
            // key={image.name}
            //   boxSize="150px"
            //   boxSize={{ base: '100px', md: '150px', lg: '200px' }}
            objectFit="cover"
            src={
              styleData[0]?.MiddleContentBox?.backgroundImage2 ||
              defaultAppStyles?.MiddleContentBox.backgroundImage2
            }
            alt=""
          />
        </Box>
      </Flex>

      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent overflow={'auto'} h="300px">
          <EditMiddleContentBox
            placement={placement}
            setPlacement={setPlacement}
          />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MiddleContentBox;
