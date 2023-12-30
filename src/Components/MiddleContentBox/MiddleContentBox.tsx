import React, { useState, useEffect } from 'react';
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

import { useUserStore } from '../../stores/useUserStore';
import { EditIcon } from '@chakra-ui/icons';
import { defaultAppStyles } from '../../config/defaultAppStyles';
import { useEditStylesStore } from '../../stores/useEditStylesStore';
import parse from 'html-react-parser';
import EditMiddleContentBox from '../EditMiddleContentBox/EditMiddleContentBox';

const MiddleContentBox = () => {
  const { editMode } = useUserStore((state: any) => state);
  const { middleContentBoxData, middleContentBoxBodyData } = useEditStylesStore(
    (state: any) => state
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setAllStyles({
      headerText: middleContentBoxData?.headerText
        ? middleContentBoxData?.headerText
        : defaultAppStyles.middleContentBox.headerText,
      headerFontStyle: middleContentBoxData?.headerFontStyle
        ? middleContentBoxData?.headerFontStyle
        : defaultAppStyles.middleContentBox.headerFontStyle,
      bodyText: middleContentBoxBodyData?.bodyText
        ? middleContentBoxBodyData?.bodyText
        : defaultAppStyles.middleContentBoxBody.bodyText,
      backgroundImage1: middleContentBoxData?.backgroundImage1
        ? middleContentBoxData?.backgroundImage1
        : defaultAppStyles?.middleContentBox.backgroundImage1,
      backgroundImage2: middleContentBoxData?.backgroundImage2
        ? middleContentBoxData?.backgroundImage2
        : defaultAppStyles?.middleContentBox.backgroundImage2,
      headerAlign: middleContentBoxData?.headerAlign
        ? middleContentBoxData?.headerAlign
        : defaultAppStyles.middleContentBox.headerAlign,

      backgroundImageOpacity: middleContentBoxData?.backgroundImageOpacity
        ? middleContentBoxData?.backgroundImageOpacity
        : defaultAppStyles?.middleContentBox.backgroundImageOpacity,
      isImgSelected: false,
      headerTextColor: middleContentBoxData?.headerTextColor
        ? middleContentBoxData?.headerTextColor
        : defaultAppStyles?.middleContentBox.headerTextColor,
      bodyTextColor: middleContentBoxBodyData?.bodyTextColor
        ? middleContentBoxBodyData?.bodyTextColor
        : defaultAppStyles?.middleContentBoxBody.bodyTextColor,
      bodyTextSize: middleContentBoxBodyData?.bodyTextColor
        ? middleContentBoxBodyData?.bodyTextColor
        : defaultAppStyles?.middleContentBoxBody.bodyTextSize,
      bodyTextAlign: middleContentBoxBodyData?.bodyTextAlign
        ? middleContentBoxBodyData?.bodyTextAlign
        : defaultAppStyles?.middleContentBoxBody.bodyTextAlign,
    });
  }, [middleContentBoxData, middleContentBoxBodyData]);

  const [allStyles, setAllStyles] = useState({
    headerText: middleContentBoxData?.headerText
      ? middleContentBoxData?.headerText
      : defaultAppStyles.middleContentBox.headerText,
    headerFontStyle: middleContentBoxData?.headerFontStyle
      ? middleContentBoxData?.headerFontStyle
      : defaultAppStyles.middleContentBox.headerFontStyle,
    bodyText: middleContentBoxBodyData?.bodyText
      ? middleContentBoxBodyData?.bodyText
      : defaultAppStyles.middleContentBoxBody.bodyText,
    backgroundImage1: middleContentBoxData?.backgroundImage1
      ? middleContentBoxData?.backgroundImage1
      : defaultAppStyles?.middleContentBox.backgroundImage1,
    backgroundImage2: middleContentBoxData?.backgroundImage2
      ? middleContentBoxData?.backgroundImage2
      : defaultAppStyles?.middleContentBox.backgroundImage2,
    headerAlign: middleContentBoxData?.headerAlign
      ? middleContentBoxData?.headerAlign
      : defaultAppStyles.middleContentBox.headerAlign,

    backgroundImageOpacity: middleContentBoxData?.backgroundImageOpacity
      ? middleContentBoxData?.backgroundImageOpacity
      : defaultAppStyles?.middleContentBox.backgroundImageOpacity,
    isImgSelected: false,
    headerTextColor: middleContentBoxData?.headerTextColor
      ? middleContentBoxData?.headerTextColor
      : defaultAppStyles?.middleContentBox.headerTextColor,
    bodyTextColor: middleContentBoxBodyData?.bodyTextColor
      ? middleContentBoxBodyData?.bodyTextColor
      : defaultAppStyles?.middleContentBoxBody.bodyTextColor,
    bodyTextSize: middleContentBoxBodyData?.bodyTextColor
      ? middleContentBoxBodyData?.bodyTextColor
      : defaultAppStyles?.middleContentBoxBody.bodyTextSize,
    bodyTextAlign: middleContentBoxBodyData?.bodyTextAlign
      ? middleContentBoxBodyData?.bodyTextAlign
      : defaultAppStyles?.middleContentBoxBody.bodyTextAlign,
  });

  const fontSize = () => {
    if (middleContentBoxBodyData?.bodyTextColor === 'sm') {
      return { base: '8px', md: '13.33px', lg: '18.67px' };
    } else if (middleContentBoxBodyData?.bodyTextColor === 'md') {
      return { base: '16px', md: '26.67px', lg: '37.33px' };
    } else if (middleContentBoxBodyData?.bodyTextColor === 'lg') {
      return { base: '24px', md: '40px', lg: '56px' };
    }
  };
  return (
    <Box pb={2}>
      {editMode && (
        <Flex justifyContent={'center'}>
          <EditIcon
            onClick={() => {
              onOpen();
            }}
          />
        </Flex>
      )}
      <Flex justifyContent={allStyles.headerAlign}>
        {/* Header Text */}
        <Text
          color={allStyles.headerTextColor}
          fontSize={{ base: '24px', md: '40px', lg: '56px' }}
          fontWeight={'bold'}
          style={{
            fontFamily: `${allStyles.headerFontStyle}`,
          }}
        >
          {(parse(allStyles.headerText) as string) ||
            defaultAppStyles?.middleContentBox.headerText ||
            ''}
        </Text>
      </Flex>
      {/* Body Text */}
      <Flex
        mt={10}
        // pt={}
        justifyContent={allStyles.bodyTextAlign}
      >
        <Text
          color={allStyles.bodyTextColor}
          fontSize={
            fontSize() || defaultAppStyles?.middleContentBoxBody.bodyTextSize
          }
          fontWeight={'bold'}
        >
          {parse(allStyles.bodyText) as string}
        </Text>
      </Flex>

      <Flex justifyContent={'space-around'}>
        <Box>
          <Image
            h={{ base: '200px', md: '400px', lg: '500px' }}
            w={{ base: '200px', md: '400px', lg: '500px' }}
            objectFit="cover"
            src={allStyles.backgroundImage1}
            alt=""
          />
        </Box>
        <Box>
          <Image
            h={{ base: '200px', md: '400px', lg: '500px' }}
            w={{ base: '200px', md: '400px', lg: '500px' }}
            objectFit="cover"
            src={allStyles.backgroundImage2}
            alt=""
          />
        </Box>
      </Flex>

      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent overflow={'auto'} h="300px">
          <EditMiddleContentBox setAllStyles={setAllStyles} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MiddleContentBox;
