import React, { useState } from 'react';
import axios from '../../config/AxiosConfig';
import { useUsersStore } from '../../stores/useUsersStore';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Center,
  Box,
  Heading,
  Stack,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Button,
} from '@chakra-ui/react';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values: FormValues) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (Object.keys(errors).length > 0) {
    throw errors;
  }
  return { values: values, errors: errors };
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: resolver,
  });

  const loginUser = useUsersStore((state: any) => state?.loginUser);

  const toast = useToast();

  const onSubmit = handleSubmit(data => {
    axios
      .post('/users/login', data)
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
  });

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
                      {...register('email')}
                      type="email"
                      id="email"
                      name="email"
                    />
                  </Box>
                  <Box>
                    <FormLabel>Password</FormLabel>
                    <Input
                      {...register('password')}
                      type="password"
                      id="password"
                      name="password"
                    />
                  </Box>
                  <Button type="submit">Submit</Button>
                  {/* <NavLink to="/Sign-up">Register</NavLink> */}
                </Stack>
              </CardBody>
            </FormControl>
          </form>
        </Card>
      </Box>
      <DevTool control={control} />
    </Center>
  );
};

export default Login;
