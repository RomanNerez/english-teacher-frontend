'use client';

import Portal from '@mui/material/Portal';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { StyledToaster } from './styles';

// ----------------------------------------------------------------------

export function Snackbar() {
  return (
    <Portal>
      <StyledToaster
        expand
        gap={12}
        closeButton
        offset={16}
        visibleToasts={4}
        position='top-right'
        icons={{
          loading: <span />,
          info: <InfoIcon />,
          success: <CheckCircleIcon />,
          warning: <WarningIcon />,
          error: <ErrorIcon />,
        }}
      />
    </Portal>
  );
}
