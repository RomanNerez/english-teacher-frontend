import { BackendService } from '@shared/api/backend';
import { SimpleLayout } from '@shared/ui/simple-layout';
import { PasswordResetForm } from '@features/auth';
import { redirect } from 'next/navigation';
import { Alert } from '@mui/material';

type ResetPageProps = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ email: string }>;
};

export async function PasswordResetPage(props: ResetPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const res = await BackendService.checkResetPasswordToken(params.token, searchParams);

  if (res.status === 404) redirect('/404');

  return (
    <SimpleLayout>
      <Alert>Test</Alert>
      <PasswordResetForm token={params.token} email={searchParams.email} />
    </SimpleLayout>
  );
}
