import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

// import EditHeroBox from '../EditHeroBox/EditHeroBox';
import { EditIcon } from '@chakra-ui/icons';
import { defaultAppStyles } from '../../config/defaultAppStyles';
import { useEditStylesStore } from '../../stores/useEditStylesStore';
import { useUserStore } from '../../stores/useUserStore';
import EditHeroBox from '../EditHeroBox/EditHeroBox';

type Props = {
  height?: number | string;
  state?: any;
};

const HeroBox = (props: Props) => {
  const { editMode } = useUserStore((state: any) => state);
  const { heroBoxData, heroBoxBodyData } = useEditStylesStore(
    (state: any) => state
  );

  useEffect(() => {
    setAllStyles({
      backgroundImageOpacity: heroBoxData?.backGroundImageOpacity
        ? heroBoxData?.backGroundImageOpacity
        : defaultAppStyles?.heroBox.backgroundImageOpacity,
      backgroundImage: heroBoxData?.backgroundImage
        ? heroBoxData?.backgroundImage
        : defaultAppStyles?.heroBox.backgroundImage,
      bodyTextSize: heroBoxData?.bodyTextSize
        ? heroBoxData?.bodyTextSize
        : defaultAppStyles?.heroBoxBody.bodyTextSize,
      headerAlign: heroBoxData?.headerAlign
        ? heroBoxData?.headerAlign
        : defaultAppStyles?.heroBox.headerAlign,
      headerTextColor: heroBoxData?.headerTextColor
        ? heroBoxData?.headerTextColor
        : defaultAppStyles?.heroBox.headerTextColor,
      headerFontStyle: heroBoxData?.headerFontStyle
        ? heroBoxData?.headerFontStyle
        : defaultAppStyles?.heroBox.headerFontStyle,
      headerText: heroBoxData?.headerText
        ? heroBoxData?.headerText
        : defaultAppStyles?.heroBox.headerText,
      bodyTextAlign: heroBoxBodyData?.bodyTextAlign
        ? heroBoxBodyData?.bodyTextAlign
        : defaultAppStyles?.heroBoxBody.bodyTextAlign,
      bodyTextColor: heroBoxBodyData?.bodyTextColor
        ? heroBoxBodyData?.bodyTextColor
        : defaultAppStyles?.heroBoxBody.bodyTextColor,
      bodyText: heroBoxBodyData?.bodyText
        ? heroBoxBodyData?.bodyText
        : defaultAppStyles?.heroBoxBody.bodyText,
    });
  }, [heroBoxData, heroBoxBodyData]);

  const [allStyles, setAllStyles] = useState({
    backgroundImageOpacity: heroBoxData?.backgroundImageOpacity
      ? heroBoxData?.backgroundImageOpacity
      : defaultAppStyles?.heroBox.backgroundImageOpacity,
    backgroundImage: heroBoxData?.backgroundImage
      ? heroBoxData?.backgroundImage
      : defaultAppStyles?.heroBox.backgroundImage,
    bodyTextSize: heroBoxData?.bodyTextSize
      ? heroBoxData?.bodyTextSize
      : defaultAppStyles?.heroBoxBody.bodyTextSize,
    headerAlign: heroBoxData?.headerAlign
      ? heroBoxData?.headerAlign
      : defaultAppStyles?.heroBox.headerAlign,
    headerTextColor: heroBoxData?.headerTextColor
      ? heroBoxData?.headerTextColor
      : defaultAppStyles?.heroBox.headerTextColor,
    headerFontStyle: heroBoxData?.headerFontStyle
      ? heroBoxData?.headerFontStyle
      : defaultAppStyles?.heroBox.headerFontStyle,
    headerText: heroBoxData?.headerText
      ? heroBoxData?.headerText
      : defaultAppStyles?.heroBox.headerText,
    bodyTextAlign: heroBoxBodyData?.bodyTextAlign
      ? heroBoxBodyData?.bodyTextAlign
      : defaultAppStyles?.heroBoxBody.bodyTextAlign,
    bodyTextColor: heroBoxBodyData?.bodyTextColor
      ? heroBoxBodyData?.bodyTextColor
      : defaultAppStyles?.heroBoxBody.bodyTextColor,
    bodyText: heroBoxBodyData?.bodyText
      ? heroBoxBodyData?.bodyText
      : defaultAppStyles?.heroBoxBody.bodyText,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const customStyles = {
    background: `linear-gradient(rgba(255, 255, 255, 0.${allStyles?.backgroundImageOpacity}), rgba(255, 255, 255, 0.${allStyles?.backgroundImageOpacity})), url(${allStyles?.backgroundImage})`,

    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const fontSize = () => {
    if (allStyles?.bodyTextSize === 'sm') {
      return { base: '8px', md: '13.33px', lg: '18.67px' };
    } else if (allStyles?.bodyTextSize === 'md') {
      return { base: '16px', md: '26.67px', lg: '37.33px' };
    } else if (allStyles?.bodyTextSize === 'lg') {
      return { base: '24px', md: '40px', lg: '56px' };
    }
  };

  return (
    <Box
      h={props.height}
      sx={customStyles}
      backgroundPosition={'center'}
      backgroundSize={'cover'}
    >
      {editMode && (
        <Flex justifyContent={'center'}>
          <EditIcon
            onClick={() => {
              onOpen();
            }}
          />
        </Flex>
      )}
      <Flex justifyContent={allStyles?.headerAlign}>
        {/* Header Text */}
        <Text
          color={allStyles?.headerTextColor}
          fontSize={{ base: '24px', md: '40px', lg: '56px' }}
          fontWeight={'bold'}
          style={{
            fontFamily: `${allStyles?.headerFontStyle}`,
          }}
        >
          {(parse(allStyles?.headerText) as string) ||
            defaultAppStyles?.heroBox.headerText ||
            ''}
        </Text>
      </Flex>
      {/* Body Text */}
      <Flex
        mt={20}
        // pt={}
        justifyContent={allStyles?.bodyTextAlign}
      >
        <Text
          color={allStyles?.bodyTextColor}
          fontSize={fontSize() || defaultAppStyles?.heroBoxBody.bodyTextSize}
          fontWeight={'bold'}
        >
          {allStyles?.bodyText}
        </Text>
      </Flex>
      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent overflow={'auto'} h="300px">
          <EditHeroBox setAllStyles={setAllStyles} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default HeroBox;
