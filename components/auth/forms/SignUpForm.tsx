'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { register } from '@/authActions';
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
import { useToast } from '@/hooks';
import { registerFormSchema } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export function SignUpForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    setLoading(true);
    try {
      const res = await register(values);
      if (res?.error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: res.error,
        });
      }
      // if (res.success) {
      //   toast({
      //     description: `Account is created successfully!`,
      //   });
      // }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Something went wrong. Please try again.',
      });
      setLoading(false);
    }
  };

  return (
    <CardWrapper headerLabel="Create an account" title="Sign up">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5 justify-self-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormSuccessMessage message={success} /> */}
          {/* <FormErrorMessage message={error} /> */}
          <Button
            type="submit"
            disabled={loading}
            className={`${loading ? 'bg-gray-600' : 'bg-blue-600'} w-full px-12 py-3`}
          >
            <p className="text-background">
              {loading ? 'Loading...' : 'Sign up'}
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
        <p className="text-background">Sign up with Google</p>
      </AuthProviderButton>
      <AuthProviderButton
        provider="github"
        icon={<GitHubLogoIcon className="h-5 w-5" />}
        className="mt-4"
      >
        <p className="text-background">Sign up with GitHub</p>
      </AuthProviderButton>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?&nbsp;
        <Link className="text-blue-500 hover:underline" href="/signin">
          Sign in
        </Link>
      </p>
    </CardWrapper>
  );
}
