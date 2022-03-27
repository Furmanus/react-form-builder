import { TextField } from '@mui/material';
import { CommonOptions } from '../formBuilder.interfaces';
import { CSSProperties, SyntheticEvent } from 'react';

export type WithInputOptions = CommonOptions & {
  onChange?: (e: SyntheticEvent) => void;
};

const formHelperStyles = {
  sx: {
    marginLeft: 0,
  },
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function createInput(config: WithInputOptions, cssProperties: CSSProperties = {}): JSX.Element {
  const { name, id, label, defaultValue, helperText, key, onChange } = config;

  return <TextField
    name={name}
    id={id}
    label={label}
    onChange={onChange || noop}
    defaultValue={defaultValue}
    helperText={helperText}
    key={key ?? id ?? name}
    sx={cssProperties}
    FormHelperTextProps={formHelperStyles}
    fullWidth
  />;
}
