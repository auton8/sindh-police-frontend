import React, {useState} from 'react';
import {Box} from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router';
import {alpha, makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {CurrentAuthMethod} from '@jumbo/constants/AppConstants';
import AuthWrapper from './AuthWrapper';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const useStyles = makeStyles((theme) => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    [theme.breakpoints.up('md')]: {
      width: (props) => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  textCapital: {
    textTransform: 'none',
  },
  textAcc: {
    textAlign: 'center',
    '& a': {
      marginLeft: 4,
    },
  },
  alrTextRoot: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
}));

const Toast = MySwal.mixin({
  target: '#myTest',
  customClass: {
    container: {
      position: 'absolute',
      zIndex: 999999999,
    },
  },
  toast: true,
  position: 'top',

  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const PasswordPage = ({method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default', params}) => {
  const [state, setState] = useState({password: '', email: '', isLoading: false});
  const classes = useStyles({variant});
  const history = useHistory();
  const showMessage = (icon, text, title) => {
    Toast.fire({
      icon,
      title: text,
    });
  };

  const getValue = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
  };
  const checkToken = async (token, resetPassword) => {
    try {
      Axios.post('http://13.213.60.237:3008/api/auth/check-forgot-link', token)
        .then((result) => {
          result = result.data;
          if (result.status) {
            resetPassword();
          } else {
            showMessage('error', result.message, 'Error');
            setState({...state, isLoading: false});
          }
        })
        .catch((e) => {
          showMessage('error', e, 'Error');
          setState({...state, isLoading: false});
        });
    } catch (e) {
      showMessage('error', e, 'Error');
      setState({...state, isLoading: false});
    }
  };

  const resetPassword = () => {
    try {
      const data = {
        token: params.token,
        otp: params.otp,
        email: state.email,
        password: state.password,
      };
      Axios.post('http://13.213.60.237:3008/api/auth/reset-forgot-password', data)
        .then((result) => {
          result = result.data;
          if (result.status) {
            showMessage('success', result.message, 'Success');
            history.push('login/');
          } else {
            showMessage('error', result.message, 'Error');
            setState({...state, isLoading: false});
          }
        })
        .catch((e) => {
          showMessage('error', e, 'Error');
          setState({...state, isLoading: false});
        });
    } catch (e) {
      showMessage('error', e, 'Error');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setState({...state, isLoading: true});
    checkToken({token: params.token}, resetPassword);
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      <Box className={classes.authContent}>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Reset Password
        </Typography>
        <form onSubmit={onSubmit}>
          <Box mb={2}>
            <TextField
              label={'Email'}
              fullWidth
              size="small"
              required
              name="email"
              type={'email'}
              onChange={(e) => {
                getValue(e);
              }}
              value={state.email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label={'Password'}
              fullWidth
              size="small"
              required
              name="password"
              type={'password'}
              value={state.password}
              onChange={(e) => {
                getValue(e);
              }}
              margin="normal"
              variant="outlined"
              disabled={state.isLoading}
              className={classes.textFieldRoot}
            />
          </Box>
          <br />
          <Box
            display="flex"
            flexDirection={{xs: 'column', sm: 'row'}}
            alignItems={{sm: 'center'}}
            justifyContent={{sm: 'space-between'}}
            mb={3}>
            <Box mb={{xs: 2, sm: 0}}>
              <Button disabled={state.isLoading} type="submit" variant="contained" color="primary">
                {state.isLoading ? <CircularProgress size={20} /> : 'Reset'}
              </Button>
              <Button
                style={{marginLeft: '10px'}}
                disabled={state.isLoading}
                onClick={() => {
                  history.push('login/');
                }}
                variant="contained"
                color="primary">
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </AuthWrapper>
  );
};

export default PasswordPage;
