'use client';

import { Button } from '@shared/ui/button';
import { Alert, Link, Stack } from '@mui/material';
import { AuthCard } from '../ui/auth-card';
import { FormContainer } from '../ui/form-container';
import { usePasswordForgot } from '../model/password-forgot.model';
import { Field } from '@shared/ui/hook-form';

export function PasswordForgotForm() {
  const { onSubmit, methods, hasEmailSent } = usePasswordForgot();

  return (
    <AuthCard title='Відновлення пароля'>
      <FormContainer onSubmit={onSubmit} methods={methods}>
        {!hasEmailSent.value ? (
          <>
            <Field.Text name='email' label='Email' />
            <Button type='submit'>Отримати посилання</Button>
          </>
        ) : (
          <Alert variant='filled' sx={{ width: '100%', boxShadow: 3 }}>
            <Stack spacing={0.5}>
              <span>
                Ми надіслали листа для відновлення пароля на вказану електронну адресу. Перевірте
                папку "Вхідні" або "Спам".
              </span>
            </Stack>
          </Alert>
        )}
        <Link href='/login' textAlign='center'>
          Увійти
        </Link>
      </FormContainer>
    </AuthCard>
  );
}
