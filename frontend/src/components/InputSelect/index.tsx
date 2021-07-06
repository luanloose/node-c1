import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useField, useFormikContext } from 'formik'
import MenuItem from '@material-ui/core/MenuItem';

const InputSelect: React.FC<any> = ({ name, options, ...props }) => {

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name!);

  const handleChange = (evt: any) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configInput = {
    ...field,
    ...props,
    fullWidth: true,
    select: true,
    variant: 'outlined',
    margin: 'normal',
    onChange: handleChange
  } as TextFieldProps;

  if (meta && meta.touched && meta.error) {
    configInput.error = true;
    configInput.helperText = meta.error;
  }

  return (
    <TextField {...configInput}>
      {options.map((option: any) => (
        <MenuItem key={option.id} value={option.id}>
          {option.nome} - {option.descricao}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default InputSelect;