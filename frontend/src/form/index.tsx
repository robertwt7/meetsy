import React, { ReactNode, useCallback } from "react";
import type { SelectProps, TextFieldProps } from "@mui/material";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";
import { useField, useFormikContext, FieldHookConfig } from "formik";
import clsx from "clsx";

function areEqual(
  prevProps: TextFieldProps,
  nextProps: TextFieldProps
): boolean {
  if (
    prevProps.value === nextProps.value &&
    prevProps.label === nextProps.label
  ) {
    return true;
  }
  return false;
}

export const FormikTextField = React.memo<
  TextFieldProps & FieldHookConfig<string>
>(({ className, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <TextField
        className={className}
        {...field}
        {...props}
        error={Boolean(meta?.error)}
        FormHelperTextProps={{ error: true }}
        helperText={
          meta.error !== "" && meta.error !== undefined
            ? String(meta.error)
            : null
        }
        aria-invalid={Boolean(meta.error)}
      />
    </>
  );
}, areEqual);

// TODO: ask question why casting object to FormikSelectOptions is not working in typescript in AcceptForm.tsx
// https://stackoverflow.com/questions/37006008/typescript-index-signature-is-missing-in-type
export type FormikSelectOptions = Array<{
  [key: string]: string | number;
}>;

export interface FormikSelectProps<T> extends SelectProps {
  label: string;
  options: T[];
  name: string;
  className?: string;
  helperText?: ReactNode;
  handleChangeCallback?: () => void;
  valueKey?: string;
  nameKey?: string;
}

export const FormikSelect = React.memo(
  <T extends Record<string, any>>({
    label,
    options,
    name,
    className,
    helperText = "Select value from the drop down",
    handleChangeCallback,
    valueKey = "id",
    nameKey = "name",
    ...props
  }: FormikSelectProps<T>) => {
    const [field, meta] = useField(name);

    const { setFieldValue } = useFormikContext();
    const handleChange = useCallback(
      (e) => {
        if (handleChangeCallback !== undefined) {
          handleChangeCallback();
        }
        setFieldValue(name, e.target.value);
      },
      [name, setFieldValue, handleChangeCallback]
    );

    const renderValue = (): ReactNode => {
      return options.map((value) => {
        if (value[valueKey] !== undefined && value[nameKey] !== undefined) {
          return (
            <MenuItem
              value={value[valueKey]}
              key={value?.id ?? value[valueKey]}
            >
              {value[nameKey]}
            </MenuItem>
          );
        }

        return null;
      });
    };

    return (
      <FormControl variant="outlined" className={clsx(className)}>
        <InputLabel id={`${name}-label-id`}>{label}</InputLabel>
        <Select
          {...field}
          {...props}
          label={label}
          labelId={`${name}-label-id`}
          id={`${name}-select-id`}
          onChange={handleChange}
          name={name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {renderValue()}
        </Select>
        <FormHelperText error={Boolean(meta.error)}>
          {meta?.error !== undefined && meta.error !== ""
            ? String(meta.error)
            : helperText}
        </FormHelperText>
      </FormControl>
    );
  }
);
