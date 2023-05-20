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
import EditHeroBox from '../EditComponents/EditHeroBox';
import { EditIcon } from '@chakra-ui/icons';
import { defaultAppStyles } from '../../config/defaultAppStyles';
import { useEditStylesStore } from '../../stores/useEditStylesStore';

type Props = {
  height?: number | string;
  state?: any;
};

const HeroBox = (props: Props) => {
  const users = useUsersStore((state: any) => state?.data);
  const [placement, setPlacement] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { styleData, getStyles, updateStyles, stylesError } =
    useEditStylesStore((state: any) => state);

  return (
    <Box
      h={props.height}
      backgroundImage={`url(${
        styleData[0]?.heroBox?.backgroundImage ||
        defaultAppStyles?.heroBox.backgroundImage
      }})`}
      backgroundPosition={'center'}
      backgroundSize={'cover'}
    >
      <Flex justifyContent={'center'}>
        <EditIcon
          onClick={() => {
            onOpen();
          }}
        />
      </Flex>
      <Flex
        justifyContent={
          styleData[0]?.heroBox?.headerAlign ||
          defaultAppStyles?.heroBox.headerAlign
        }
      >
        <Text fontSize={{ base: '24px', md: '40px', lg: '56px' }}>
          {styleData[0]?.heroBox?.headerText ||
            defaultAppStyles?.heroBox.headerText}
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
