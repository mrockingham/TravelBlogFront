import React, { useEffect } from 'react';
import { useUsersStore } from '../../stores/useUsersStore';
import { useEditStylesStore } from '../../stores/useEditStylesStore';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Link,
  Flex,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

type Props = {
  height?: number | string;
  navNames?: string[];
  topBarNavAlign?: string;
};

const TopBar = (props: Props) => {
  const { data, getUsers, error } = useUsersStore((state: any) => state);
  const { styleData, getStyles, updateStyles, stylesError } =
    useEditStylesStore((state: any) => state);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log('data topbar', data);
  console.log('stylesData topbar', styleData);
  console.log('error topbar', error);
  return (
    <Flex direction={'row'} justify="space-between">
      <Tabs align={'center'} w="100%">
        <Box>
          <TabList>
            {props.navNames?.map((navName, index) => (
              <Tab key={index}>
                <Link href={navName === 'Home' ? '/' : navName}>{navName}</Link>
              </Tab>
            ))}
          </TabList>
        </Box>
      </Tabs>
      <Box>{data ? data?.name : ''}</Box>
    </Flex>
  );
};

export default TopBar;
