import React, { useEffect, useState } from 'react';
import axios from '../../config/AxiosConfig';
import { useUsersStore } from '../../stores/useUsersStore';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Box,
  Heading,
  Stack,
  StackDivider,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  useToast,
  Button,
} from '@chakra-ui/react';

type Props = {};

const Login = (props: Props) => {
  const users = useUsersStore((state: any) => state?.data);
  const getUsers = useUsersStore((state: any) => state?.getUsers);
  const loginUser = useUsersStore((state: any) => state?.loginUser);
  const error = useUsersStore((state: any) => state?.error);

  const toast = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  useEffect(() => {
    error &&
      toast({
        title: 'Login Error.',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
  }, [error, toast]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post('/users/login', formData)
      .then(res => {
        console.log(res.data);
        loginUser(res.data);
        toast({
          title: 'Login.',
          description: `${res.data.name}  Logged In`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  return (
    <Center h="100vh" w="100%">
      <Box>
        <Card>
          <form onSubmit={onSubmit}>
            <FormControl>
              <CardHeader>
                <Heading size="md">Login</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                    />
                  </Box>
                  <Button type="submit">Submit</Button>
                </Stack>
              </CardBody>
            </FormControl>
          </form>
        </Card>
      </Box>
    </Center>
  );
};

export default Login;
