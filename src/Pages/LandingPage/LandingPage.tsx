import React, { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useUsersStore } from '../../stores/useUsersStore';
import HeroBox from '../../Components/HeroBox/HeroBox';

type Props = {};

const LandingPage = (props: Props) => {
  const { data, getUsers, error } = useUsersStore((state: any) => state);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log('data', data);

  return (
    <Box fontSize="xl" w="100%">
      <HeroBox height={500} />
    </Box>
  );
};

export default LandingPage;
