'use client';

import { FormContainer } from '../ui/form-container';
import { Button } from '@shared/ui/button';
import { Link } from '@mui/material';
import { Field } from '@shared/ui/hook-form';
import { AuthCard } from '../ui/auth-card';
import { useRegister } from '../model/register.model';

export function RegisterForm() {
  const { onSubmit, methods } = useRegister();

  return (
    <AuthCard title='Реєстрація'>
      <FormContainer onSubmit={onSubmit} methods={methods}>
        <Field.Text name='first_name' label='Імʼя' />
        <Field.Text name='last_name' label='Призвіще' />
        <Field.Text name='email' label='Email' type='email' />
        <Field.Password name='password' label='Пароль' />
        <Field.Password name='confirm_password' label='Підтвердити Пароль' />
        <Button type='submit'>Зареєструватися</Button>
        <Link href='/login' textAlign='center'>
          Увійти
        </Link>
      </FormContainer>
    </AuthCard>
  );
}
