import React from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

export const renderButton = (
  text: string,
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
) => (
  <Button fullWidth variant="contained" onClick={onClick}>
    {text}
  </Button>
);

export const renderAddTodoBtn = (
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
  disabledCondition: boolean
) => renderButton('Add Todo', onClick);

export const renderModal = (
  onClose: // eslint-disable-next-line @typescript-eslint/ban-types
  ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined,
  isOpen: boolean,
  body: React.ReactElement<any, string | React.JSXElementConstructor<any>>
) => (
  <Modal
    onClose={onClose}
    open={isOpen}
    aria-labelledby="modal-information"
    aria-describedby="rendered-by-a-render-function"
  >
    {body}
  </Modal>
);

export const renderTextField = (
  label: any | null | undefined,
  value: string,
  onChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined,
  name = 'text-field',
  isDisabled = false
) => (
  <TextField
    fullWidth
    variant="outlined"
    placeholder={label}
    name={name}
    onChange={onChange}
    value={value}
    label={label}
    disabled={isDisabled}
  />
);

export const renderHelperText = (
  error:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
) => <FormHelperText error>{error}</FormHelperText>;

export const handleChange =
  (setData: (arg0: (old: any) => any) => void) =>
  (event: { target: { value: any; name: any } }) => {
    const { value, name } = event.target;

    setData((old: any) => ({
      ...old,
      [name]: value
    }));
  };

export const renderMenuItem = (item) => (
  <MenuItem key={item._id} value={item._id}>
    {item?.name}
  </MenuItem>
);

export const renderMenuItems = (menuItems) =>
  menuItems.map((menuItem) => renderMenuItem(menuItem));

const renderLabel = (name, label) => (
  <InputLabel htmlFor={name}>{label}</InputLabel>
);

export const renderSelect = (label, name, onChange, options, value = '') => (
  <FormControl fullWidth>
    {renderLabel(name, label)}
    <Select defaultValue={value} onChange={onChange} name={name} id={name}>
      {renderMenuItems(options)}
    </Select>
  </FormControl>
);
export const joinErrMsgs = (errs) =>
  errs.map((data) => data.$message).join(',');

export const renderSubmitButton = (text, validate) => (
  <Button
    onClick={validate}
    color="secondary"
    fullWidth
    variant="contained"
    type="submit"
  >
    {text}
  </Button>
);
export default {
  joinErrMsgs,
  renderButton,
  renderModal,
  renderTextField,
  renderHelperText,
  handleChange,
  renderSubmitButton
};
