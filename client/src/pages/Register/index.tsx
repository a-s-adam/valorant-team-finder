import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
  Container,
  Heading,
  Link,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import api from '../../services/api';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  rank: string;
  mainRole: string;
}

const ranks = [
  'Iron',
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Diamond',
  'Ascendant',
  'Immortal',
  'Radiant',
];

const roles = ['Duelist', 'Initiator', 'Controller', 'Sentinel'];

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterForm>();
  
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await api.post('/auth/register', data);
      dispatch(setCredentials(response.data));
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to register',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.sm">
      <Box p={8}>
        <Stack spacing={8}>
          <Stack align="center">
            <Heading fontSize="4xl">Create your account</Heading>
            <Text fontSize="lg" color="gray.600">
              to join the Valorant Team Finder community ✌️
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg="white"
            boxShadow="lg"
            p={8}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={4}>
              <FormControl id="username" isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.username?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="rank" isInvalid={!!errors.rank}>
                <FormLabel>Current Rank</FormLabel>
                <Select
                  placeholder="Select rank"
                  {...register('rank', {
                    required: 'Rank is required',
                  })}
                >
                  {ranks.map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.rank?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="mainRole" isInvalid={!!errors.mainRole}>
                <FormLabel>Main Role</FormLabel>
                <Select
                  placeholder="Select role"
                  {...register('mainRole', {
                    required: 'Main role is required',
                  })}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.mainRole?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="confirmPassword"
                isInvalid={!!errors.confirmPassword}
              >
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  {...register('confirmPassword', {
                    validate: (val: string) => {
                      if (!val) {
                        return 'Please confirm your password';
                      }
                      return watch('password') === val || 'Passwords do not match';
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={isSubmitting}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align="center">
                  Already a user?{' '}
                  <Link as={RouterLink} to="/login" color="blue.400">
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Register; 