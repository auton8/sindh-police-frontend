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
        type="text"
        label={'Full Name'}
        name="full_name"
        fullWidth
        onChange={handleOnChangeTF}
        value={state.full_name}
        margin="normal"
        size="small"
        variant="outlined"
        required
        className={classes.textFieldRoot}
        disabled={state.is_loading}
      />
      <TextField
        type="username"
        label={'Username'}
        fullWidth
        name="username"
        value={state.username}
        size="small"
        margin="normal"
        variant="outlined"
        required
        className={classes.textFieldRoot}
        onChange={handleOnChangeTF}
        disabled={true}
      />
      <TextField
        type="email"
        label={'Email Address'}
        fullWidth
        name="email"
        value={state.email}
        margin="normal"
        size="small"
        required
        variant="outlined"
        className={classes.textFieldRoot}
        onChange={handleOnChangeTF}
        disabled={true}
      />
    </div>
  );
};

export default BasicForm;
