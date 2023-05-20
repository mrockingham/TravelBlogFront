import React, { useEffect, useState } from 'react';
import axios from '../../config/AxiosConfig';
import { useUsersStore } from '../../stores/useUsersStore';
import { NavLink, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const users = useUsersStore((state: any) => state?.data);
  const getUsers = useUsersStore((state: any) => state?.getUsers);
  const loginUser = useUsersStore((state: any) => state?.loginUser);

  const toast = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  // useEffect(() => {
  //   error &&
  //     toast({
  //       title: 'Login Error.',
  //       description: error,
  //       status: 'error',
  //       duration: 9000,
  //       isClosable: true,
  //     });
  // }, [error, toast]);

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
        console.log(res);
        loginUser(res.data);
        if (res.status === 200) {
          toast({
            title: 'Success.',
            description: `${res.data.name} has logged in`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          navigate('/');
        }
      })
      .catch(err => {
        toast({
          title: 'Login Error.',
          description: err.response.data,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });

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
                  <NavLink to="/Sign-up">Register</NavLink>
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
