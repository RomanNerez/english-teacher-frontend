import { Form, FormProps } from '@shared/ui/hook-form';

export function FormContainer({ children, ...props }: FormProps) {
  return (
    <Form {...props} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {children}
    </Form>
  );
}
