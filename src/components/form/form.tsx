import { Box } from '@mui/material';
import { useMemo, memo, CSSProperties, useCallback, BaseSyntheticEvent } from 'react';
import { FormBuilder } from './builder/formBuilder';
import { loggerService } from '../services/logger.service';

const selectData = {
  id: 'country',
  name: 'country',
  label: 'Country',
  key: 'country',
  defaultValue: 'pl',
  helperText: 'Where are you from?',
  options: [
    { value: 'pl', text: 'Poland' },
    { value: 'en', text: 'United Kingdom' },
    { value: 'de', text: 'Germany' },
  ]
};
const selectCssProperties: CSSProperties = {
  marginTop: '15px',
};
const formStyles = {
  width: '50%',
  padding: '30px 0',
  borderRadius: '15px',
  boxShadow: '0 0 2px 0 #000',
  minHeight: '400px',
  maxWidth: '600px',
};

function AppFormFunc(): JSX.Element {
  loggerService.log('AppForm render');

  const FormContent = useMemo(
    () => FormBuilder
      .create('MyForm')
      .withSectionStart({ heading: 'Login data', withDivider: true, shrinkable: true })
      .withInput({
        id: 'first_name',
        name: 'first_name',
        label: 'First name',
        key: 'first_name',
        helperText: 'Please enter first name',
      })
      .withInput({
        id: 'last_name',
        name: 'last_name',
        label: 'Last name',
        key: 'last_name',
        helperText: 'Please enter last name',
      })
      .withCheckbox({
        id: 'consent',
        name: 'mail_consent',
        label: 'Send me newsletters'
      })
      .withSectionEnd()
      .withSectionStart({ heading: 'User details', shrinkable: true })
      .withSelect(selectData, selectCssProperties)
      .withSectionEnd()
      .withSubmitButton({ text: 'Send' })
      .build(),
    [],
  );
  const handleSubmit = useCallback((e: BaseSyntheticEvent) => {
    e.preventDefault();
    loggerService.log(new FormData(e.target));
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={formStyles}
    >
      <FormContent />
    </Box>
  );
}

export const AppForm = memo(AppFormFunc);
