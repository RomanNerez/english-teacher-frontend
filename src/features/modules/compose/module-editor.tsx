'use client';

import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteIcon from '@mui/icons-material/Delete';

export function ModuleEditor() {
  const [items, setItems] = useState([]);

  const addItem = useCallback(() => {
    setItems(prev => [...prev, {}]);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((item, i) => i !== index));
  }, []);

  return (
    <Stack gap={2}>
      <TextField fullWidth label='Name' />
      <TextField fullWidth label='Description' multiline rows={4} />

      <Stack gap={2}>
        {items.map((item, index) => (
          <Card>
            <CardContent>
              <Stack gap={2}>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography>{index + 1}</Typography>
                  <Stack flexDirection={'row'} gap={2}>
                    <IconButton>
                      <DragHandleIcon />
                    </IconButton>
                    <IconButton onClick={() => removeItem(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>
                <Stack flexDirection={'row'} gap={2}>
                  <TextField fullWidth label='Термін' />
                  <TextField fullWidth label='Визначення' />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
        <Button variant='contained' onClick={addItem}>
          Додати картку
        </Button>
      </Stack>
    </Stack>
  );
}
