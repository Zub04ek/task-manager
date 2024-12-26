'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLoginUser } from '@/app/api/hooks/user';
import { FormErrorMessage, FormSuccessMessage } from '@/components/auth';
import { AuthProviderButton } from '@/components/AuthProviderButton';
import { CardWrapper } from '@/components/CardWrapper';
import { GoogleIcon } from '@/components/GoogleIcon';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { loginFormSchema } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate: loginUserMutate } = useLoginUser();

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true);
    loginUserMutate(values, {
      onError: (error: Error | AxiosError) => {
        setSuccess('');
        if (
          error instanceof AxiosError &&
          error.response &&
          error.response.data
        ) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
        setLoading(false);
      },
      onSuccess: () => {
        setError('');
        setSuccess('User logged in successfully!');
        setLoading(false);
        router.push('/');
      },
    });
    // form.reset();
  }

  return (
    <CardWrapper headerLabel="Log in to your account" title="Sign in">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 justify-self-center"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="mt-1 h-10 p-2 px-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="mt-1 h-10 p-2 px-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSuccessMessage message={success} />
          <FormErrorMessage message={error} />
          <Button
            type="submit"
            disabled={loading}
            className={`${loading ? 'bg-gray-600' : 'bg-blue-600'} w-full px-12 py-3`}
          >
            <p className="text-background">
              {loading ? 'Loading...' : 'Sign in'}
            </p>
          </Button>
        </form>
      </Form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <AuthProviderButton
        provider="google"
        icon={<GoogleIcon className="h-5 w-5" />}
      >
        <p className="text-background">Sign in with Google</p>
      </AuthProviderButton>
      <AuthProviderButton
        provider="github"
        icon={<GitHubLogoIcon className="h-5 w-5" />}
        className="mt-4"
      >
        <p className="text-background">Sign in with GitHub</p>
      </AuthProviderButton>
      <p className="mt-4 text-center text-sm text-gray-600">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </CardWrapper>
  );
}
