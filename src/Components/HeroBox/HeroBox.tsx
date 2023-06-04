import { useState, useEffect } from 'react';
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
import { useUsersStore } from '../../stores/useUsersStore';
import FileUpload from '../FileUpload/FileUpload';
import Imageview from '../ImageView/Imageview';
import axios from '../../config/AxiosConfig';
import EditHeroBox from '../EditHeroBox/EditHeroBox';
import { EditIcon } from '@chakra-ui/icons';
import { defaultAppStyles } from '../../config/defaultAppStyles';
import { useEditStylesStore } from '../../stores/useEditStylesStore';

type Props = {
  height?: number | string;
  state?: any;
};

const HeroBox = (props: Props) => {
  const { data, getUsers, error, editMode, isEditMode } = useUsersStore(
    (state: any) => state
  );
  const [placement, setPlacement] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { styleData, getStyles } = useEditStylesStore((state: any) => state);
  const [pageStyles, setPageStyles] = useState(styleData);

  const customStyles = {
    background: `linear-gradient(rgba(255, 255, 255, 0.${
      styleData[0]?.heroBox?.backGroundImageOpacity ||
      defaultAppStyles?.heroBox.backgroundImageOpacity
    }), rgba(255, 255, 255, 0.${
      styleData[0]?.heroBox?.backGroundImageOpacity ||
      defaultAppStyles?.heroBox.backgroundImageOpacity
    })), url(${
      styleData[0]?.heroBox?.backgroundImage ||
      defaultAppStyles?.heroBox.backgroundImage
    })`,
    // backgroundBlendMode: 'overlay',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // height: `${props.height}px}`,
  };
  console.log('styleData', styleData);

  const fontSize = () => {
    if (styleData[0]?.heroBox?.bodyTextSize === 'sm') {
      return { base: '8px', md: '13.33px', lg: '18.67px' };
    } else if (styleData[0]?.heroBox?.bodyTextSize === 'md') {
      return { base: '16px', md: '26.67px', lg: '37.33px' };
    } else if (styleData[0]?.heroBox?.bodyTextSize === 'lg') {
      return { base: '24px', md: '40px', lg: '56px' };
    }
  };

  console.log('syle data', styleData);
  console.log('fontSize', fontSize());
  return (
    <Box
      h={props.height}
      // backgroundImage={`url(${
      //   styleData[0]?.heroBox?.backgroundImage ||
      //   defaultAppStyles?.heroBox.backgroundImage
      // }})`}
      sx={customStyles}
      backgroundPosition={'center'}
      backgroundSize={'cover'}
      // backgroundColor={'rgba(0, 0, 0, 0.5)'}
      // bg={`linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${
      //   styleData[0]?.heroBox?.backgroundImage ||
      //   defaultAppStyles?.heroBox.backgroundImage
      // }`}
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
      <Flex
        justifyContent={
          styleData[0]?.heroBox?.headerAlign ||
          defaultAppStyles?.heroBox.headerAlign
        }
      >
        {/* Header Text */}
        <Text
          color={
            styleData[0]?.heroBox?.headerTextColor ||
            defaultAppStyles?.heroBox.headerTextColor
          }
          fontSize={{ base: '24px', md: '40px', lg: '56px' }}
          fontWeight={'bold'}
        >
          {styleData[0]?.heroBox?.headerText ||
            defaultAppStyles?.heroBox.headerText}
        </Text>
        {/* Body Text */}
      </Flex>
      <Flex
        mt={20}
        // pt={}
        justifyContent={
          styleData[0]?.heroBox?.bodyTextAlign ||
          defaultAppStyles?.heroBox.bodyTextAlign
        }
      >
        <Text
          color={
            styleData[0]?.heroBox?.bodyTextColor ||
            defaultAppStyles?.heroBox.bodyTextColor
          }
          fontSize={fontSize() || defaultAppStyles?.heroBox.bodyTextSize}
          fontWeight={'bold'}
        >
          {styleData[0]?.heroBox?.bodyText ||
            defaultAppStyles?.heroBox.bodyText}
        </Text>
      </Flex>
      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent overflow={'auto'} h="300px">
          <EditHeroBox placement={placement} setPlacement={setPlacement} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default HeroBox;
