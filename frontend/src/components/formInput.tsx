import {
    FormHelperText,
    FormControl,
    Input as _Input,
    TextFieldProps,
  } from "@mui/material";
import TextField from '@mui/material/TextField';
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";


type IFormInputProps = {
    name: string;
    label: string;
} & TextFieldProps;
  
const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    
    return (
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              required
              fullWidth
              id={name}
              label={label}
              name={name}
              autoComplete={name}
              autoFocus
              error={!!errors[name]}
              inputProps={{...field}}
              {...otherProps}
            />
            <FormHelperText error={!!errors[name]}>
              {errors[name] ? (errors[name]?.message as unknown as string) : ""}
            </FormHelperText>
          </FormControl>
        )}
      />
    );
};
  
export default FormInput;
