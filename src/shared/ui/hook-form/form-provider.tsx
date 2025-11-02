import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider as RHFForm } from 'react-hook-form';

export type FormProps = BoxProps & {
  onSubmit?: () => void;
  children: React.ReactNode;
  methods: UseFormReturn<any>;
};

export function Form({ children, onSubmit, methods, ...props }: FormProps) {
  return (
    <RHFForm {...methods}>
      <Box component='form' onSubmit={onSubmit} noValidate autoComplete='off' {...props}>
        {children}
      </Box>
    </RHFForm>
  );
}
