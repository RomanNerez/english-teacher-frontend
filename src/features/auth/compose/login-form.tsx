'use client';

import { FormContainer } from '../ui/form-container';
import Box from '@mui/material/Box';
import { Button } from '@shared/ui/button';
import { Link } from '@mui/material';
import { useLogin } from '../model/login.model';
import { Field } from '@shared/ui/hook-form';
import { AuthCard } from '../ui/auth-card';

export function LoginForm() {
  const { onSubmit, methods } = useLogin();

  return (
    <AuthCard title='Вхід'>
      <FormContainer onSubmit={onSubmit} methods={methods}>
        <Field.Text name='email' label='Email' type='email' required />
        <Box display='flex' flexDirection='column'>
          <Link href='/password/forgot' textAlign='end'>
            Забули пароль?
          </Link>
          <Field.Password name='password' label='Пароль' required />
        </Box>
        <Field.Checkbox name='remember' label='Запамʼятати мене' />
        <Button type='submit'>Увійти</Button>
        <Link href='/register' textAlign='center'>
          Зареєструватися
        </Link>
      </FormContainer>
    </AuthCard>
  );
}
