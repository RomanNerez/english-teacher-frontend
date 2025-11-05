import { SimpleLayout } from '@/src/shared/ui/simple-layout';
import { PasswordResetForm } from '@features/auth';

type ResetPageProps = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ email: string }>;
};

export async function PasswordResetPage(props: ResetPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  console.log(params, searchParams);

  return (
    <SimpleLayout>
      <PasswordResetForm token={params.token} email={searchParams.email} />
    </SimpleLayout>
  );
}
