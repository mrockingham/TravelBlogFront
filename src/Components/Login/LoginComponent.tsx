import axios from '../../config/AxiosConfig';
import { useUserStore } from '../../stores/useUserStore';
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
  Input,
  useToast,
  Button,
} from '@chakra-ui/react';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { getAccount, signOutAccount, SignInAccount } from '../../config/api';

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

const LoginComponent = () => {
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

  const { getUsers } = useUserStore((state: any) => state);

  const toast = useToast();

  const onSubmit = handleSubmit(async data => {
    try {
      await SignInAccount(data);
      getUsers();
      navigate('/');
    } catch (err) {
      console.log(err);
      toast({
        title: 'Something Went Wrong',
        description: `${err}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  });

  const getUser = () => {
    getAccount();
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

                  <Link to="/Signup">Register</Link>
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

export default LoginComponent;
