import React, { useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import { useEditStylesStore } from '../../stores/useEditStylesStore';
import {
  Box,
  Flex,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon, EditIcon } from '@chakra-ui/icons';
import EditTopBarNav from '../Edit/editTopBar/editTopBar';
import { defaultAppStyles } from '../../config/defaultAppStyles';
import { signOutAccount } from '../../config/api';

type Props = {
  height?: number | string;
  navNames?: string[];
  topBarNavAlign?: string;
  backgroundColor?: string;
};

const TopBar = (props: Props) => {
  const { data, editMode, isEditMode, getUsers, signOutUser } = useUserStore(
    (state: any) => state
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState();
  // const [isEdit, setIsEditMode] = useState(false);
  const { styleData } = useEditStylesStore((state: any) => state);

  useEffect(() => {
    if (!data.name) {
      getUsers();
    }
  }, []);

  console.log('the data', data);
  return (
    <Box borderBottom={'1px'}>
      <Flex
        // justifyContent={'center'}
        justifyContent={
          styleData?.topBarNavAlign || defaultAppStyles.styles.topBarNavAlign
        }
        w="100%"
      >
        <Flex mr="5px" ml="5px">
          {props.navNames?.map((navName, index) => (
            <Box key={index}>
              <Link to={navName === 'Home' ? '/' : navName}>
                <Text ml="15px" fontSize="4xl">
                  {navName}
                </Text>
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        {data?.name && (
          <Button
            size="xs"
            variant="outline"
            colorScheme="black"
            onClick={() => isEditMode(!editMode)}
          >
            Edit Mode {editMode ? 'on' : 'off'}
          </Button>
        )}
        <Box mr={'60px'}>
          {data?.name ? (
            <Menu>
              <MenuButton
                variant="ghost"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {data?.name}
              </MenuButton>
              <MenuList onClick={() => signOutUser()}>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            ''
          )}{' '}
        </Box>
        {editMode && (
          <EditIcon
            onClick={() => {
              onOpen();
            }}
          />
        )}
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
