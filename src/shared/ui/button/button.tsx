import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export function Button(props: MuiButtonProps) {
  return <MuiButton variant='contained' color='primary' {...props} />;
}