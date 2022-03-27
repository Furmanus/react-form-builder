import { CommonOptions } from '../formBuilder.interfaces';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { CSSProperties } from 'react';

interface SelectOption {
  value: string;
  text: string;
}

export type WithSelectConfig = CommonOptions & {
  options?: SelectOption[];
};

const formHelperStyles = {
  marginLeft: 0,
};

export function createSelect(config: WithSelectConfig, cssProperties: CSSProperties = {}): JSX.Element {
  const { name, id, label, defaultValue, helperText, key, options } = config;

  return (
    <FormControl fullWidth={true} key={key ?? id ?? name} sx={cssProperties}>
      <InputLabel id={`label_${id}`}>{label}</InputLabel>
      <Select
        labelId={`label_${id}`}
        id={id}
        label={label}
        name={name}
        defaultValue={defaultValue}
      >
        {options?.map((opt) => (
          <MenuItem value={opt.value} key={opt.value}>{opt.text}</MenuItem>
        ))}
      </Select>
      <FormHelperText sx={formHelperStyles}>{helperText}</FormHelperText>
    </FormControl>
  );
}
