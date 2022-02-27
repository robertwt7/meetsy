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

export interface FormikSelectProps extends SelectProps {
  label: string;
  options: Array<{ id: string | number; name: string | number }>;
  name: string;
  className?: string;
  helperText?: ReactNode;
  handleChangeCallback?: () => void;
}

export const FormikSelect = React.memo(
  ({
    label,
    options,
    name,
    className,
    helperText = "Select value from the drop down",
    handleChangeCallback,
    ...props
  }: FormikSelectProps) => {
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
          {options.map((value) => (
            <MenuItem value={value.id} key={value.id}>
              {value.name}
            </MenuItem>
          ))}
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
