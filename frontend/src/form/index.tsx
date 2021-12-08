import React, { useCallback, useEffect, useState } from "react";
import { withStyles, makeStyles } from "@mui/styles";
import type { TextFieldProps } from "@mui/material";
import {
  InputBase,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Switch,
  Button,
  FormLabel,
  Card,
  CardMedia,
  Checkbox,
  Autocomplete,
  Slide,
} from "@mui/material";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/lab";
import {
  useField,
  useFormikContext,
  FieldArray,
  FieldHookConfig,
} from "formik";
import PropTypes from "prop-types";
import * as dayjs from "dayjs";
import axios from "axios";
import clsx from "clsx";

// Style used locally
export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  p8: {
    padding: theme.spacing(1),
  },
  full: {
    width: "100%",
    height: "100%",
  },
  flex: {
    display: "flex",
  },
  formControl: {
    margin: `${theme.spacing(3)} 0px`,
  },
}));

FormikCheckbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  customHandleChange: PropTypes.func,
};

export function FormikCheckbox({
  label,
  name,
  options,
  customHandleChange = undefined,
}) {
  const classes = useStyles();
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChange = useCallback(
    (event) => {
      const index = field.value.findIndex(
        (item) => item.id === parseInt(event.target.name, 10)
      );
      const itemValue = {
        ...field.value[index],
        is_checked: event.target.checked,
      };
      const newValue = [...field.value];
      newValue[index] = itemValue;

      setFieldValue(name, newValue);
    },
    [field.value, name]
  );
  return (
    <div className={classes.flex}>
      <FormControl
        required
        error={meta.error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {options.map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  checked={item.is_checked}
                  onChange={customHandleChange || handleChange}
                  name={item.id}
                />
              }
              label={item.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}

AutoCompleteTextField.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  variant: PropTypes.string,
  name: PropTypes.string,
  useIdAsValue: PropTypes.bool,
};

/**
 *
 * This is naked field, need to wrap it with div for styling
 * Unlike all the other forms where m-8 is the default
 *
 * @props useIdAsValue is like FormikSelect where it used the ID of an object for value
 */
function AutoCompleteTextField({
  id,
  options,
  label,
  name,
  variant = "outlined",
  useIdAsValue = false,
}) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [selectedVal, setSelectedVal] = useState({});

  const handleChange = React.useCallback(
    (event, newVal) => {
      if (useIdAsValue) {
        if (newVal) {
          setFieldValue(name, newVal.id);
        } else {
          setFieldValue(name, "");
        }
      } else {
        setFieldValue(name, newVal);
      }
    },
    [setFieldValue, name, useIdAsValue]
  );

  useEffect(() => {
    // Only used if we want to use id as value
    // If field.value has data then initiate the correct one
    if (useIdAsValue) {
      if (field.value) {
        const index = options.findIndex(
          (item) => item.id === parseInt(field.value, 10)
        );
        setSelectedVal(options[index]);
      } else {
        setSelectedVal({});
      }
    }
  }, [field.value, options, useIdAsValue]);

  return (
    <Autocomplete
      id={id}
      options={options}
      onChange={handleChange}
      getOptionLabel={(option) => option.name || ""}
      value={useIdAsValue ? selectedVal : field.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant={variant}
          FormHelperTextProps={{ error: true }}
          helperText={meta.error ? String(meta.error) : null}
        />
      )}
    />
  );
}

export const FormikFileUpload = ({ name, label, uploadUrl, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const classes = useStyles();
  const handleChange = useCallback(
    async (e) => {
      const files = [];
      const data = new FormData();
      data.append("userId", 1);
      for (let x = 0; x < e.currentTarget.files.length; x += 1) {
        files.push(e.currentTarget.files[x]);
        data.append("images[]", e.currentTarget.files[x]);
      }

      try {
        const payload = await axios.post(uploadUrl, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { data: links } = payload;
        setFieldValue(name, links);
      } catch (err) {
        console.log(`There is an error in uploading the image${err.message}`);
      }
    },
    [name, setFieldValue]
  );

  return (
    <>
      <Button
        variant="contained"
        component="label"
        className={classes.instructions}
      >
        {label || "Upload File"}
        <input
          name={name}
          {...props}
          type="file"
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </Button>
      {meta.error ? <p className="text-danger">{meta.error}</p> : null}
      {field.value &&
        field.value.map((value, index) => (
          <Card className={classes.root} key={index}>
            <CardMedia
              className={`${classes.media} bg-contain`}
              image={value}
              title="Thumbnail"
            />
          </Card>
        ))}
    </>
  );
};

FormikFileUpload.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  uploadUrl: PropTypes.string.isRequired,
};

function areEqual(prevProps, nextProps): boolean {
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
        FormHelperTextProps={{ error: true }}
        helperText={meta.error ? String(meta.error) : null}
        aria-invalid={Boolean(meta.error)}
      />
    </>
  );
}, areEqual);

export const FormikNativeTime = ({ className, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      type="time"
      defaultValue="22:30"
      className={className || "mx-8 w-full"}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
      helperText={meta.error ? String(meta.error) : null}
      {...field}
      {...props}
    />
  );
};

FormikNativeTime.propTypes = {
  className: PropTypes.string,
};

export const FormikSwitch = ({
  name,
  label,
  color,
  customHandleChange,
  helperText = undefined,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const classes = useStyles();

  const handleChange = useCallback(
    (e) => {
      setFieldValue(name, e.target.checked);
    },
    [name, setFieldValue]
  );

  return (
    <>
      <FormGroup className={classes.margin}>
        <FormControlLabel
          name={name}
          control={
            <Switch
              checked={field.value}
              onChange={customHandleChange || handleChange}
              className={color}
            />
          }
          label={label}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormGroup>
      {meta.error ? <p className="text-warning">{meta.error}</p> : null}
    </>
  );
};

FormikSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  customHandleChange: PropTypes.func,
  helperText: PropTypes.string,
};

export const FormikSelect = React.memo(
  ({
    label,
    labelId,
    selectId,
    options,
    name,
    className,
    helperText = "Select value from the drop down",
    customHandleChange,
    ...props
  }) => {
    const [field, meta] = useField(name);
    const classes = useStyles();
    const { setFieldValue } = useFormikContext();
    const handleChange = useCallback(
      (e) => {
        setFieldValue(name, e.target.value);
      },
      [name, setFieldValue]
    );

    const renderHelperText = useCallback(() => {
      if (typeof helperText === "function") {
        return helperText();
      }
      return helperText;
    }, [helperText]);

    return (
      <FormControl
        variant="outlined"
        className={clsx(className || classes.margin, "min-w-128")}
      >
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          {...field}
          {...props}
          label={label}
          labelId={labelId}
          id={selectId}
          onChange={customHandleChange || handleChange}
          name={name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((value) => (
            <MenuItem
              value={value.id || value.name}
              key={value.id || value.name}
            >
              {value.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={Boolean(meta.error)}>
          {meta.error ? String(meta.error) : renderHelperText()}
        </FormHelperText>
      </FormControl>
    );
  }
);

FormikSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  selectId: PropTypes.string.isRequired,
  className: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  customHandleChange: PropTypes.func,
};

export const FormikRadioButton = ({
  name,
  options,
  label,
  disabled = false,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChange = useCallback(
    (e) => {
      setFieldValue(name, parseInt(e.target.value, 10));
    },
    [name, setFieldValue]
  );

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend" required>
          {label}
        </FormLabel>
        <RadioGroup {...field} {...props} name={name} onChange={handleChange}>
          {options.map((value) => (
            <FormControlLabel
              control={<Radio disabled={disabled} />}
              label={value.name}
              value={value.id}
              key={value.id}
            />
          ))}
        </RadioGroup>
        {meta.error ? <div className="error">{meta.error}</div> : null}
      </FormControl>
    </>
  );
};

FormikRadioButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export const FormikPicker = ({
  format = null,
  dateTime = "true",
  name,
  label,
  variant = "dialog",
  inputVariant = "standard",
  className,
  ...props
}) => {
  const [field, meta] = useField(name);
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const handlePickerChange = useCallback(
    (value) => {
      // Format value according to Moment JS in YYYY-MM-DDTHH:mm:iiZ
      const time = value ? value.format() : null;
      setFieldValue(name, time);
    },
    [name, setFieldValue]
  );

  return (
    <div className={className || "m-8"}>
      {dateTime ? (
        <DateTimePicker
          ampm
          mask="__-__-____ __:__"
          autoOk
          className="w-full"
          format={format || "DD-MM-YYYY HH:mm"}
          onChange={handlePickerChange}
          name={name}
          label={label}
          variant={variant}
          inputVariant={inputVariant}
          value={field.value}
          {...props}
        />
      ) : (
        <DatePicker
          className="w-full"
          format={format || "DD-MM-YYYY"}
          mask="__-__-____"
          autoOk
          onChange={handlePickerChange}
          name={name}
          label={label}
          variant={variant}
          inputVariant={inputVariant}
          value={field.value}
          {...props}
        />
      )}

      {Boolean(meta.error) && (
        <p className="text-red-600 text-xs m-8">{String(meta.error)}</p>
      )}
    </div>
  );
};

FormikPicker.propTypes = {
  format: PropTypes.string,
  dateTime: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  inputVariant: PropTypes.string,
  className: PropTypes.string,
};

export const FormikTime = ({
  name,
  label,
  variant,
  className,
  ampm = true,
  inputVariant,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const classes = useStyles();

  const handleTimeChange = useCallback(
    (value) => {
      setFieldValue(name, value.format("HH:mm"));
    },
    [name, setFieldValue]
  );
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <TimePicker
        className={className || classes.margin}
        autoOk
        onChange={handleTimeChange}
        name={name}
        label={label}
        variant={variant}
        inputVariant={inputVariant || "standard"}
        value={dayjs(field.value, "HH:mm")}
        ampm={ampm}
      />
      {meta.error ? (
        <p className="text-red-600 text-xs m-8">{String(meta.error)}</p>
      ) : null}
    </MuiPickersUtilsProvider>
  );
};

FormikTime.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
  inputVariant: PropTypes.string,
  ampm: PropTypes.bool,
};

export const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: "1.4rem",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const ArrayContext = React.createContext({});

/**
 *
 * @export
 * @param {*} { name (initial array name in Const), children (children of the arrays) }
 * @returns Children provided with index, remove and push function from formik FieldArray
 */
export function FormikArray({ name, defaultValue, children }) {
  const [field] = useField(name);
  const classes = useStyles();
  return (
    <FieldArray
      name={name}
      render={({ remove, push }) => (
        <>
          {field.value.length > 0 &&
            field.value.map((value, index) => {
              const formikFieldHelpers = {
                index,
              };
              return (
                <Slide direction="up" in mountOnEnter unmountOnExit>
                  <div className="flex flex-col" key={index}>
                    <div className={`${classes.margin}`}>
                      <Button
                        variant="contained"
                        component="label"
                        className={`${classes.instructions} ${classes.margin}`}
                        onClick={() => {
                          push(defaultValue);
                        }}
                      >
                        Add New
                      </Button>
                      {field.value.length > 1 && (
                        <Button
                          variant="contained"
                          component="label"
                          className={`${classes.instructions} ${classes.margin}`}
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <ArrayContext.Provider value={formikFieldHelpers}>
                      {typeof children === "function"
                        ? children(formikFieldHelpers)
                        : children}
                    </ArrayContext.Provider>
                  </div>
                </Slide>
              );
            })}
        </>
      )}
    />
  );
}

FormikArray.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.func.isRequired,
  ]),
};

export default {
  FormikArray,
  FormikTextField,
  FormikFileUpload,
  FormikPicker,
  FormikSelect,
  AutoCompleteTextField,
  FormikRadioButton,
  FormikTime,
  FormikNativeTime,
  FormikSwitch,
  FormikCheckbox,
};
