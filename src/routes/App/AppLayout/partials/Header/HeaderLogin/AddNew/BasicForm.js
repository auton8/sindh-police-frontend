import React from 'react';
import {TextField} from '@material-ui/core';
import {makeStyles, alpha} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
}));

const BasicForm = ({state, handleOnChangeTF}) => {
  const classes = useStyles();
  return (
    <div>
      <TextField
        type="password"
        label={'Old Password'}
        name="old_password"
        fullWidth
        onChange={handleOnChangeTF}
        value={state.old_password}
        margin="normal"
        size="small"
        variant="outlined"
        required
        className={classes.textFieldRoot}
        disabled={state.is_loading}
      />
      <TextField
        type="password"
        label={'New Password'}
        fullWidth
        name="new_password"
        value={state.new_password}
        margin="normal"
        size="small"
        required
        variant="outlined"
        className={classes.textFieldRoot}
        onChange={handleOnChangeTF}
        disabled={state.is_loading}
      />
      <TextField
        type="password"
        label={'Confirm Password'}
        fullWidth
        name="confirm_password"
        value={state.confirm_password}
        size="small"
        margin="normal"
        variant="outlined"
        required
        className={classes.textFieldRoot}
        onChange={handleOnChangeTF}
        disabled={state.is_loading}
      />
    </div>
  );
};

export default BasicForm;
