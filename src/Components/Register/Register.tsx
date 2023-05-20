import React, { useState } from 'react';
import axios from '../../config/AxiosConfig';
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

const Register = (props: Props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
  });

  const { name, email, password, verifyPassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      toast({
        title: 'Registration Error.',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      axios
        .post('/users', formData)
        .then(res => {
          if (res.status === 201) {
            toast({
              title: 'Registration.',
              description: `User ${res.data.name} created.`,
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
            navigate('/login');
          }
        })
        .catch(err => {
          toast({
            title: 'Login Error.',
            description: err.response.data.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });

          console.log(err.response.data);
        });
    }
  };

  return (
    <Center h="100vh">
      <Box>
        <Card>
          <form onSubmit={onSubmit}>
            <FormControl>
              <CardHeader>
                <Heading size="md">Sign-Up</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={onChange}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                    />
                    <FormHelperText>
                      We'll never share your email.
                    </FormHelperText>
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
                  <Box>
                    <FormLabel>Verify Password</FormLabel>
                    <Input
                      type="password"
                      id="veryPassword"
                      name="verifyPassword"
                      value={verifyPassword}
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

export default Register;
