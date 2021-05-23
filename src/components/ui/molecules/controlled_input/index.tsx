import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from '@chakra-ui/react';

interface IControlledInputProps {
  label: string;
  formControlId: string;
  errorMessage?: string;
  isInvalid: boolean;
  inputProps?: InputProps;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

function ControlledInput({
  errorMessage,
  isInvalid,
  label,
  handleBlur,
  handleChange,
  formControlId,
  inputProps,
}: IControlledInputProps): JSX.Element {
  return (
    <FormControl id={formControlId} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Input variant={'filled'} onChange={handleChange} onBlur={handleBlur} {...inputProps} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}

export default ControlledInput;
