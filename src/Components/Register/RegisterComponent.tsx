import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  FormHelperText,
  Input,
  useToast,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { useForm, Resolver } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { createUserAccount } from '../../config/api';

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

const RegisterComponent = () => {
  const [regPin, setRegPin] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: resolver,
  });

  const onSubmit = handleSubmit(async data => {
    try {
      if (regPin === process.env.REACT_APP_REGISTER) {
        await createUserAccount(data);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
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
                  <Box>
                    <FormLabel>Pin</FormLabel>
                    <Input onChange={e => setRegPin(e.target.value)} />
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

export default RegisterComponent;
