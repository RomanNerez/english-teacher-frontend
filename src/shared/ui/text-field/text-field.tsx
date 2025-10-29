import MuiTextField from '@mui/material/TextField';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

export function TextField(props: MuiTextFieldProps) {
    return <MuiTextField variant='outlined' {...props} />
}