import { Box, Typography, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const PasswordStrengthMeter = () => {
  const { watch } = useFormContext();
  const password = watch('password', '');

  const [strength, setStrength] = useState(0);
  const [rules, setRules] = useState({
    length: false,
    number: false,
    uppercase: false,
    lowercase: false,
    symbol: false,
  });

  useEffect(() => {
    const hasLength = password.length >= 12;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    setRules({
      length: hasLength,
      number: hasNumber,
      uppercase: hasUpper,
      lowercase: hasLower,
      symbol: hasSymbol,
    });

    const fulfilled = [hasLength, hasNumber, hasUpper, hasLower, hasSymbol].filter(Boolean).length;
    setStrength(fulfilled);
  }, [password]);

  const getStrengthLabel = () => {
    if (strength === 5) return { label: 'Сильний', color: '#2e7d32' }; // зелёный
    if (strength >= 3) return { label: 'Середній', color: '#ed6c02' }; // оранжевый
    return { label: 'Слабкий', color: '#d32f2f' }; // красный
  };

  const { label, color } = getStrengthLabel();

  const ruleList = [
    { key: 'length', text: 'Мінімум 12 символів' },
    { key: 'number', text: 'Містить хоча б одну цифру' },
    { key: 'uppercase', text: 'Містить хоча б одну велику літеру' },
    { key: 'lowercase', text: 'Містить хоча б одну малу літеру' },
    { key: 'symbol', text: 'Містить хоча б один спеціальний символ' },
  ];

  return (
    <Box>
      <Typography variant='subtitle2' gutterBottom>
        Надійність пароля:
      </Typography>

      <LinearProgress
        variant='determinate'
        value={(strength / 5) * 100}
        sx={{
          height: 10,
          borderRadius: 2,
          [`& .MuiLinearProgress-bar`]: { backgroundColor: color },
          mb: 1,
        }}
      />

      <Typography variant='body2' sx={{ color, fontWeight: 600, mb: 1 }}>
        {label}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {ruleList.map(({ key, text }) => {
          const passed = rules[key as keyof typeof rules];
          const Icon = passed ? CheckCircleIcon : CancelIcon;
          const iconColor = passed ? 'success.main' : 'error.main';
          return (
            <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon sx={{ fontSize: 20, color: iconColor }} />
              <Typography variant='body2'>{text}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
