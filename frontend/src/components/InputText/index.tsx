import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useField } from 'formik'

const InputText: React.FC<TextFieldProps> = ({ name, ...props }) => {

  const [field, mata] = useField(name!);

  const configInput = {
    ...field,
    ...props,
    fullWidth: true,
    variant: 'outlined',
    margin: 'normal'
  } as TextFieldProps;

  if (mata && mata.touched && mata.error) {
    configInput.error = true;
    configInput.helperText = mata.error;
  }

  return (
    <TextField {...configInput} />
  );
}

export default InputText;