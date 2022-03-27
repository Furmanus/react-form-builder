import { CommonOptions } from '../formBuilder.interfaces';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useMemo } from 'react';

export type CheckboxProps = Pick<CommonOptions, 'id' | 'name' | 'label' | 'key'> & {
  defaultChecked?: boolean;
};

export function FormCheckbox(config: CheckboxProps): JSX.Element {
  const { defaultChecked, id, label, name } = config;
  const checkboxComp = useMemo(() => {
    return <Checkbox id={id} name={name} defaultChecked={defaultChecked} />;
  }, [id, name, defaultChecked]);

  return (
    <FormControlLabel control={checkboxComp} label={label} />
  );
}
