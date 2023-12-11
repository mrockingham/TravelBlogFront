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
import { useForm, Resolver } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
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

const Register = () => {
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
  const toast = useToast();

  const onSubmit = handleSubmit(data => {
    console.log(data);
    if (data.password !== data.verifyPassword) {
      toast({
        title: 'Registration Error.',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      axios
        .post('/users', data)
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
  });

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
                      {...register('name')}
                      type="text"
                      id="name"
                      name="name"
                    />
                  </Box>
                  <Box>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      {...register('email')}
                      type="email"
                      id="email"
                      name="email"
                    />
                    <FormHelperText>
                      We'll never share your email.
                    </FormHelperText>
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
                  <Box>
                    <FormLabel>Verify Password</FormLabel>
                    <Input
                      {...register('verifyPassword')}
                      type="password"
                      id="veryPassword"
                      name="verifyPassword"
                    />
                  </Box>
                  <Button type="submit">Submit</Button>
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

export default Register;
