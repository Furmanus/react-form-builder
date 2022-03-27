import { Button } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

export interface SubmitButtonConfig {
  text: string | ReactNode;
}

const buttonStyles: CSSProperties = {
  alignSelf: 'self-end',
  marginTop: '15px',
};

export function createSubmitButtonElement(config: SubmitButtonConfig): JSX.Element {
  const { text } = config;

  return (
    <Button
      key="formBuilderSubmit"
      type="submit"
      variant="contained"
      sx={buttonStyles}
      fullWidth
    >
      {text}
    </Button>
  );
}
