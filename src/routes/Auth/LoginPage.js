import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, TextField, CircularProgress, Backdrop, Box,InputAdornment } from '@material-ui/core';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { isPasswordValid, isValidEmail } from '@jumbo/utils/commonHelper';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { AuhMethods } from '@services/auth';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { CurrentAuthMethod } from '@jumbo/constants/AppConstants';
import AuthWrapper from './AuthWrapper';
import { fetchError } from '@redux/actions';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, graphConfig } from '../../authConfig';
import { Constants } from '@services';
import Info from "./Auton_info"
import ReCAPTCHA from 'react-google-recaptcha';
import '../../../src/css/theme.css';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { flags } from '@jumbo/components/AppLayout/partials/LanguageSwitcher/data';

const useStyles = makeStyles((theme) => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  errorNumber: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    lineHeight: 1.5,
    textShadow: '10px 6px 8px hsla(0,0%,45.9%,.8)',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  forgot: {
    '&:hover': {
      color: 'blue',
      cursor: 'pointer',
    },
    position: 'absolute',
    fontSize: '.8rem',
    right: '0px',
    top: '-2px',
  },
  activation_link: {
    '&:hover': {
      color: 'blue',
      cursor: 'pointer',
    },
    fontSize: '.8rem'
  },
}));

function validateWhiteSpace(val) {
  return val.trim().length > 0;
}

const buttonStyle = { backgroundColor: '#ffffff', borderRadius: '8px', height: '60px', width: '60%' };
const SignIn = ({ method = CurrentAuthMethod, variant = 'default' }) => {
  const wrapperVariant = 'login';
  const common = useSelector(({ common }) => common);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptcha, setRecaptcha] = useState(false);
  const [password, setPassword] = useState('');
  const { authUser } = useSelector(({ auth }) => auth);
  const [missingParamsError, setMissingParamsError] = useState({ email: false, password: false, message: '' });
  const history = useHistory();
  const url = window.origin
  const dispatch = useDispatch();
  const classes = useStyles({ variant });
  const { error, message } = common;
  const captchaOnChange = (value) => {
    if (value !== "" || value !== undefined) {
      setRecaptcha(true)
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchError(''));
      if (error) setErrorMessage(error);
    }, 200);
    var search = window.location.search;
    var params = new URLSearchParams(search);
    const token = params.get('token');
    if (token) {
      dispatch(AuhMethods[method].onLogin({ token }));
    }
  }, [dispatch, error, message]);

  const onSubmit = (e) => {
    if (password.length < 5) {
      setMissingParamsError({ ...missingParamsError, password: true, message: '8 characters with a mix of letters, numbers and symbols' });
    }
    if (password.length === 0) {
      setMissingParamsError({ ...missingParamsError, password: true, message: 'This is a required field' });
    }

    if (password.length > 0 && !isPasswordValid(password)) {
      setMissingParamsError({ ...missingParamsError, password: true, message: '8 characters with a mix of letters, numbers and symbols' });
    }
    if (!validateWhiteSpace) {
      setMissingParamsError({ ...missingParamsError, email: true, message: 'This is a required field' });
    }

    if (!isValidEmail(email)) {
      setMissingParamsError({ ...missingParamsError, email: true, message: 'Please enter a valid email address (Ex: john@gmail.com)' });
    }

    if (email === '') {
      setMissingParamsError({ ...missingParamsError, email: true, message: 'This is a required field' });
    }

    e.preventDefault();
    if (email !== '' && password !== '' && isValidEmail(email) && isPasswordValid(password) && validateWhiteSpace(email)) {
      dispatch(AuhMethods[method].onLogin({ email, password }));
    }
  };

  if (authUser) {
    var search = window.location.search;
    var params = new URLSearchParams(search);
    var redirectUrl = params.get('action_url');
    if (authUser.organizations && authUser.organizations.length < 1) {
      history.push('/app/orgs');
    } else {
      if (redirectUrl) {
        history.push(redirectUrl);
      } else {
        history.push('/app/dashboard');
      }
    }
  }

  const { instance } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const microAuth = () => {
    instance
      .loginPopup(loginRequest)
      .then((response) => {
        callMsGraph(response.accessToken).then((response) => {
          setGraphData(response);
          if (response) {
            dispatch(AuhMethods[method].onLogin({ micro: response }));
          }
        });
      })
      .catch((e) => { });
  };

  /**
   * Attaches a given access token to a MS Graph API call. Returns information about the user
   * @param accessToken
   */
  async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append('Authorization', bearer);
    const options = {
      method: 'GET',
      headers: headers,
    };

    return fetch(graphConfig.graphMeEndpoint, options)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  const googleAuth = () => {
    window.open(`${Constants.API_URL}auth/google/callback`, '_self');
  };

  const githubAuth = () => {
    window.open(`${Constants.API_URL}auth/github/callback`, '_self');
  };
  return (
    <div>

    <div className='loginLeft'>
      <h1>Auton<span>8</span></h1>
          <form className='outerFormBox'> 
          <h3>Login</h3>
            <Box mb={2}>
              <label>Email</label>
              <TextField
                InputProps={{
                  startAdornment: (
                   <PersonOutlineOutlinedIcon />
                  ),
                 }}
                fullWidth
                placeholder="someone@else.com"
                size="small"
                onChange={(event) => {
                  setMissingParamsError({ ...missingParamsError, email: false });
                  setEmail(event.target.value);
                }}
                defaultValue={email}
                margin="normal"
                variant="outlined"
                className={missingParamsError.email == true ? 'filedfocusError' : 'filedfocus'}
                disabled={common.loading}
              />
              {missingParamsError.email && (
                <Typography className='loginError'>
                  {missingParamsError.message}
                </Typography>
              )}
            </Box>
            <Box mb={2} position="relative">
            <label>Password</label>
              <TextField
                type="password"
                size="small"
                placeholder="*******************"
                InputProps={{
                  startAdornment: (
                   <LockOutlinedIcon />
                  ),
                 }}
                fullWidth
                onChange={(event) => {
                  setMissingParamsError({ ...missingParamsError, password: false });
                  setPassword(event.target.value);
                }}
                defaultValue={password}
                margin="normal"
                variant="outlined"
                className={password.length === 0  || password.length < 8 ? 'filedfocusError' : 'filedfocus'}
                disabled={common.loading}
              />

              {missingParamsError.password && (
                <Typography className='loginError'>
                  {missingParamsError.message}
                </Typography>
              )}

              <Typography
                onClick={() => {
                  history.push('/forgot');
                }}
                variant="body"
                className={classes.forgot}>
                Forgot Your Password?
              </Typography>


              <Box mb={2} display={'flex'} width={'100%'} justifyContent={'flex-end'}>
                <Typography
                  onClick={() => {
                    history.push('/otp');
                  }}
                  variant="body"
                  className={classes.activation_link}>
                  Account is not activated ?
                </Typography>
              </Box>
              <Box margin="10px 0px">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={captchaOnChange}
                />
              </Box>
            </Box>
            {errorMessage !== '' && (
              <Box width="100%" display="flex">
                <Typography className='loginError'>
                  {errorMessage}
                </Typography>
              </Box>
            )}
            <Box alignItems="center" mt={3} mb={1}>
              <Button
                disableRipple
                fullWidth
                type="submit"
                onClick={(e) => {
                  onSubmit(e);
                }}
                variant="contained"
                color="success"
                className='loginBtn'
                disabled={common.loading || !recaptcha}>
                <IntlMessages id="appModule.signIn" />
              </Button>
            </Box>
            <Box alignItems="center" mt={3} mb={1}>
              <Button
                onClick={() => {
                  history.push('/signup');
                }}
                variant="contained"
                className='signupBtn'
                disabled={common.loading}>
                <Typography>Don’t have an account yet ? <span>Sign Up</span> </Typography>
              </Button>
            </Box>
           <p className='sHeading'><span>OR LOGIN VIA</span></p>
            <Box display={'flex'} alignItems="center" justifyContent={'space-between'} width="100%">
            <Box className='socialBox'>
              <Button
                onClick={googleAuth}
                disabled={common.loading || !recaptcha}>
                <img src={`${url}/images/search1.png`} alt="google icon" width={32} />
              </Button>
            </Box>
            <Box className='socialBox'>
              <Button
                onClick={githubAuth}
                disabled={common.loading || !recaptcha}>
                <img src={`${url}/images/github1.png`} alt="github icon" width={32} />
              </Button>
            </Box>
            <Box className='socialBox'>
              <Button
                onClick={microAuth}
                disabled={common.loading || !recaptcha}>
                <img src={`${url}/images/microsoft1.png`} alt="microsoft icon" width={32} />
              </Button>
            </Box>
          </Box>
          </form>
        <Backdrop className={classes.backdrop} open={common.loading}>
          <CircularProgress color="secondary" />
        </Backdrop>
    </div>

    <div className='loginRight'>
      <h2>Welcome to <span>Auton <i>8</i></span></h2>
      <p>Automate your QA testing and achieve greater efficiency.</p>
      <h5>© 2023 Auton8. All rights reserved</h5>
    </div>
    {/* <AuthWrapper variant={wrapperVariant}>
      <Box className={classes.authContent}>
        <Info />
        <Divider orientation="vertical" flexItem style={{ margin: '0px 30px' }} />
      </Box>
    </AuthWrapper> */}
    </div>
  );
};

export default SignIn;
