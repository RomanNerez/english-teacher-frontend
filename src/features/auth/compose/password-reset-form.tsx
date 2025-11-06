'use client';

import { Button } from '@shared/ui/button';
import { AuthCard } from '../ui/auth-card';
import { FormContainer } from '../ui/form-container';
import { Field } from '@shared/ui/hook-form';
import { usePasswordReset } from '../model/password-reset.model';
import { PasswordStrengthMeter } from './password-strength-meter';

type PasswordResetForm = {
  token: string;
  email: string;
};

export function PasswordResetForm({ token, email }: PasswordResetForm) {
  const { onSubmit, methods } = usePasswordReset({ token, email });

  return (
    <AuthCard title='Відновлення пароля'>
      <FormContainer onSubmit={onSubmit} methods={methods}>
        <Field.Text name='email' label='Email' disabled />
        <Field.Password name='password' label='Пароль' />
        <PasswordStrengthMeter />
        <Field.Password name='confirm_password' label='Пароль' />
        <Button type='submit'>Відновити пароль</Button>
      </FormContainer>
    </AuthCard>
  );
}
