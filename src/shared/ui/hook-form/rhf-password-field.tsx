import type { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// NEED TO CHECK: rules of FSD
import { useBoolean } from '../../hooks/use-boolean';

type Props = TextFieldProps & {
  name: string;
};

export function RHFPasswordField({ name, helperText, type, ...other }: Props) {
  const { control } = useFormContext();
  const showPassword = useBoolean();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={showPassword.value ? 'text' : 'password'}
          value={field.value}
          onChange={event => field.onChange(event.target.value)}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={{
            autoComplete: 'off',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={showPassword.onToggle} edge='end'>
                  {showPassword.value ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...other}
        />
      )}
    />
  );
}
