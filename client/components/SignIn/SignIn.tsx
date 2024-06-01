import {
  Button,
  Checkbox,
  TextInput,
  PasswordInput,
  Select,
} from '@mantine/core';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  IconUser,
  IconLock,
  IconX,
  IconCheck,
  IconMail,
} from '@tabler/icons-react';
import { useStyles } from './SignInStyles';
import { notifications } from '@mantine/notifications';

type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  isSportsCenterOwner: boolean;
};

type SignInProps = {
  onAuthComplete: () => void;
};

export default function SignIn({ onAuthComplete }: SignInProps) {
  const [checked, setChecked] = useState(false);
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
    event?.preventDefault();

    const signInResponse = await signIn('credentials', {
      isNewUser: isRegisterPage,
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      confirmPassword: data.confirmPassword,
      isSportsCenterOwner: data.isSportsCenterOwner,
      redirect: false,
    });

    if (signInResponse?.ok)
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        icon: <IconCheck />,
        title: 'Alert',
        message: 'Authentication complete',
        color: 'teal',
      });
    else
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        icon: <IconX />,
        title: 'Alert',
        message: 'Authentication could not be completed',
        color: 'red',
      });

    notifications.cleanQueue();

    reset();
    onAuthComplete();
  };

  const classes = useStyles();

  return (
    <div className={classes.classes.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.classes.inputWrapper}>
          <TextInput
            className={classes.classes.input}
            label="Username"
            placeholder="Username"
            icon={<IconUser size="1rem" />}
            withAsterisk={isRegisterPage}
            {...register('username')}
            error={errors.username && errors.username.message}
          />

          <PasswordInput
            className={classes.classes.input}
            placeholder="Password"
            label="Password"
            icon={<IconLock size="1rem" />}
            withAsterisk={isRegisterPage}
            {...register('password')}
            error={errors.password && errors.password.message}
          />

          {isRegisterPage && (
            <>
              <PasswordInput
                className={classes.classes.input}
                placeholder="Confirm password"
                label="Confirm password"
                icon={<IconLock size="1rem" />}
                withAsterisk={isRegisterPage}
                {...register('confirmPassword', {
                  required: true,
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Your passwords do no match';
                    }
                  },
                })}
                error={errors.confirmPassword && errors.confirmPassword.message}
              />

              <TextInput
                className={classes.classes.input}
                label="Name"
                placeholder="Name"
                icon={<IconUser size="1rem" />}
                withAsterisk={isRegisterPage}
                {...register('name')}
                error={errors.name && errors.name.message}
              />

              <TextInput
                className={classes.classes.input}
                label="Email"
                placeholder="Email"
                icon={<IconMail size="1rem" />}
                withAsterisk={isRegisterPage}
                {...register('email', {
                  required: 'Email required',
                  pattern: { value: /^\S+@\S+$/, message: 'invalid email' },
                })}
                error={errors.email && errors.email.message}
              />

              <div className={classes.classes.checkboxWrapper}>
                <Checkbox
                  defaultChecked={false}
                  label="Are you a company owner?"
                  color={'teal'}
                  {...register('isSportsCenterOwner')}
                />
              </div>
            </>
          )}
        </div>
        <div className={classes.classes.submitButtonWrapper}>
          <Button className={classes.classes.button} type="submit">
            Submit
          </Button>
        </div>
      </form>
      <div className={classes.classes.redirectWrapper}>
        {isRegisterPage ? (
          <Button
            className={classes.classes.buttonReddirect}
            variant="subtle"
            onClick={() => setIsRegisterPage(false)}
          >
            Already have an account? Sign in!
          </Button>
        ) : (
          <Button
            className={classes.classes.buttonReddirect}
            variant="subtle"
            onClick={() => setIsRegisterPage(true)}
          >
            {`Don't have an account? Register now!`}
          </Button>
        )}
      </div>
    </div>
  );
}
