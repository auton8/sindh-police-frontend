import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import ContentLoader from '@jumbo/components/ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CurrentAuthMethod } from '@jumbo/constants/AppConstants';
import AuthWrapper from './AuthWrapper';
import Axios from 'axios';
import { fetchError, fetchSuccess, fetchStart } from '@redux/actions';
import validator from 'validator';
import Info from "./Auton_info"
import { Divider } from "@mui/material"
import AppLayout from "./AppLayout/index"
import ReCAPTCHA from 'react-google-recaptcha';
import '../../../src/css/theme.css';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import PhonelinkLockOutlinedIcon from '@mui/icons-material/PhonelinkLockOutlined';


const useStyles = makeStyles((theme) => ({
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
  activation_link: {
    '&:hover': {
      color: 'blue',
      cursor: 'pointer',
    },
    fontSize: '.8rem',
  },
}));

const initalState = {
  email: '',
  otp_code: '',
};

const SignUp = ({ method = CurrentAuthMethod, variant = 'default', }) => {
  const wrapperVariant = 'login';
  const [state, setState] = useState(initalState);
  const [error, setError] = useState('');
  const [recaptcha, setRecaptcha] = useState(false);
  const common = useSelector(({ common }) => common);
  if (common.error !== '') {
    if (error === '') {
      setError(common.error);
    }
  }
  const captchaOnChange = (value) => {
    if (value !== "" || value !== undefined) {
      setRecaptcha(true)
    }
  };
  const dispatch = useDispatch();
  const classes = useStyles({ variant });
  const { authUser } = useSelector(({ auth }) => auth);
  const history = useHistory();

  useEffect(() => {
    setError('');
  }, [state]);

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

  const handleOnChangeTF = (e) => {
    var { name, value } = e.target;
    e.preventDefault();
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const resendOTP = (e) => {
    e.preventDefault();
    const { email } = state;
    try {
      if (validator.default.isEmail(email)) {
        dispatch(fetchStart());
        Axios.create()
          .post('/auth/otp-resend', {
            email,
          })
          .then((ans) => {
            ans = ans.data;
            if (ans.status) {
              dispatch(fetchSuccess(ans.message));
            } else {
              dispatch(fetchError(ans.message));
            }
          })
          .catch((e) => {
            console.log(e);
            dispatch(fetchError(e.message));
          });
      } else {
        dispatch(fetchError('Invalid Email Address'));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchError(error.message));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, otp_code } = state;
    try {
      Axios.create()
        .post('/auth/otp-verify', {
          email,
          otp_code,
        })
        .then((ans) => {
          ans = ans.data;
          if (ans.status) {
            dispatch(fetchSuccess(ans.message));
            setTimeout(() => {
              history.push('/login');
            }, 1000);
          } else {
            dispatch(fetchError(ans.message));
          }
        })
        .catch((e) => {
          console.log(e);
          dispatch(fetchError(e.message));
        });
    } catch (error) {
      console.log(error);
      dispatch(fetchError(error.message));
    }
  };

  return (
   
    <div>

<div className='loginLeft'>
      <h1>Auton<span>8</span></h1> 
        
            <form onSubmit={onSubmit} className='outerFormBox'>
            <h3 style={{marginBottom:'0px'}}>Activate Your Account</h3>
              <Box mb={4}> 
                <label>Email</label>
                <TextField
                 InputProps={{
                  startAdornment: (
                   <AlternateEmailOutlinedIcon />
                  ),
                 }}
                  fullWidth
                  placeholder="someone@else.com"
                  size="small"
                  required
                  name="email"
                  type={'email'}
                  onChange={handleOnChangeTF}
                  value={state.email}
                  margin="normal"
                  variant="outlined"
                  disabled={common.loading}
                  className="filedfocus"
                />
              </Box>
              <Box>
              <label>6 Digit OTP Code</label>
                <TextField
                 InputProps={{
                  startAdornment: (
                   <PhonelinkLockOutlinedIcon />
                  ),
                 }}
                  type="number"
                  fullWidth
                  placeholder="000000"
                  size="small"
                  required
                  name="otp_code"
                  onChange={handleOnChangeTF}
                  value={state.otp_code}
                  margin="normal"
                  variant="outlined"
                  disabled={common.loading}
                  className="filedfocus"
                />
              </Box>
              <Box margin="15px 0px">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={captchaOnChange}
                />
              </Box>
              {error !== '' && (
                <Box width="100%" display="flex">
                  <Typography className='loginError'>
                    {error}
                  </Typography>
                </Box>
              )}

             <Box alignItems="center" mt={3} mb={3}>
                  <Button type="submit" disabled={common.loading || !recaptcha} 
                  variant="contained" 
                  color="success"
                  style={{marginBottom:'15px'}}
                  className='loginBtn'>
                    Verify
                  </Button>

                  <Button type="button" 
                  disabled={common.loading} 
                  variant="contained"
                  className='signupBtn'
                  onClick={resendOTP}>
                    Resend OTP
                  </Button>
              </Box>
              <Box mt={2} display={'flex'} width={'100%'}>
              <Button
                onClick={() => {
                  history.push('/login');
                }}
                variant="contained"
                className='signupBtn'
                disabled={common.loading}>
                <Typography>Have an Account?  <span>Sign In</span> </Typography>
              </Button>
                  </Box>
            </form>
          <ContentLoader />
          </div>
      <div className='loginRight'>
      <h2>Welcome to <span>Auton <i>8</i></span></h2>
      <p>Automate your QA testing and achieve greater efficiency.</p>
      <h5>© 2023 Auton8. All rights reserved</h5>
    </div>

    </div>
  );
};

export default SignUp;
