'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddUser } from '@/app/api/hooks/user';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
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
import { zodResolver } from '@hookform/resolvers/zod';

export const formSchema = z
  .object({
    name: z.string().min(1, 'Username is required!').max(100),
    email: z.string().min(1, 'Email is required!').email(),
    password: z.string().min(1, 'Password is required!').min(8),
    confirmPassword: z
      .string()
      .min(1, 'Password confirmation is required!')
      .min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { toast } = useToast();
  const { mutate: addUserMutate } = useAddUser({
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        description: `Task is created successfully!`,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    addUserMutate(values);
    form.reset();
  }

  return (
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
              <FormLabel>Username</FormLabel>
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
        <Button className="w-full" type="submit" variant="outline">
          Sign up
        </Button>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?&nbsp;
          <Link className="text-blue-500 hover:underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}
