import React from 'react';
import InputMask from 'react-input-mask';
import { useField } from 'formik'
import { TextFieldProps } from '@material-ui/core/TextField';
import TextField from '@material-ui/core/TextField';

export type InputTextMaskProps = TextFieldProps & { mask: string; };

const InputTextMask: React.FC<InputTextMaskProps> = ({ mask, name, ...props }) => {
  const [, meta, helpers] = useField(name!);

  const { value } = meta;
  const { setValue } = helpers;

  const configInput = {
    ...props,
    fullWidth: true,
    variant: 'outlined',
    margin: 'normal'
  } as TextFieldProps;

  if (meta && meta.touched && meta.error) {
    configInput.error = true;
    configInput.helperText = meta.error;
  }

  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      disabled={props.disabled}
    >
      {() => <TextField {...configInput} />}
    </InputMask>
  );
};

export default InputTextMask;