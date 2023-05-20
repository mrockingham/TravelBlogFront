import React, { useEffect } from 'react';
import { useUsersStore } from '../../stores/useUsersStore';
import { useEditStylesStore } from '../../stores/useEditStylesStore';
import {
  Box,
  Link,
  Flex,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import EditTopBarNav from '../EditComponents/EditTopBarNav';
import { defaultAppStyles } from '../../config/defaultAppStyles';

type Props = {
  height?: number | string;
  navNames?: string[];
  topBarNavAlign?: string;
};

const TopBar = (props: Props) => {
  const { data, getUsers, error } = useUsersStore((state: any) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState();
  const { styleData, getStyles, updateStyles, stylesError } =
    useEditStylesStore((state: any) => state);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Box borderBottom={'1px'}>
      <Flex
        // justifyContent={'center'}
        justifyContent={
          styleData[0]?.topBarNavAlign || defaultAppStyles.topBarNavAlign
        }
        w="100%"
      >
        <Flex mr="5px" ml="5px">
          {props.navNames?.map((navName, index) => (
            <Box key={index}>
              <Link href={navName === 'Home' ? '/' : navName}>
                <Text ml="15px" fontSize="4xl">
                  {navName}
                </Text>
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>

      <Flex justifyContent={'center'} alignItems={'center'}>
        <Box textAlign={'center'} pr="5px">
          {data ? data?.name : ''}{' '}
        </Box>
        <EditIcon
          onClick={() => {
            onOpen();
          }}
        />
      </Flex>
      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent overflow={'auto'} h="300px">
          <EditTopBarNav placement={placement} setPlacement={setPlacement} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default TopBar;
