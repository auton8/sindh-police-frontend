import React, { useState } from 'react';
import { Divider } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CurrentAuthMethod } from '@jumbo/constants/AppConstants';
import AuthWrapper from './AuthWrapper';
import Axios from 'axios';
import Info from "./Auton_info"
import ReCAPTCHA from 'react-google-recaptcha';
import { showMessage } from '@services/utils';
import '../../../src/css/theme.css';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 20,
    [theme.breakpoints.up('md')]: {
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 20,
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


const PasswordPage = ({ method = CurrentAuthMethod, variant = 'default' }) => {
  const wrapperVariant = 'login';
  const [email, setEmail] = useState();
  const [disableEmail, setDisableEmail] = useState(false);
  const [errors, setErrors] = useState({ status: false, message: '' })
  const [recaptcha, setRecaptcha] = useState(false);
  const classes = useStyles({ variant });
  const history = useHistory();
  const captchaOnChange = (value) => {
    if (value !== "" || value !== undefined) {
      setRecaptcha(true)
    }
  };
  const submitRequest = async (email) => {
    try {
      Axios.create()
        .post('/auth/forgot-password', email)
        .then((result) => {
          result = result.data;
          if (result.status) {
            showMessage(
              'success',
              `Please check your email Inbox, a reset password link
          sent to ${email.email}. Please reset
          password with in 3 hours`,
              'Success',
            );
            setDisableEmail(false);
            setTimeout(() => {
              history.goBack();
            }, 2000);
          } else {
            setErrors({ status: true, message: result.message })
            setDisableEmail(false);
          }
        })
        .catch((e) => {
          showMessage('error', e, 'Error');
          setDisableEmail(false);
        });
    } catch (e) {
      showMessage('error', e, 'Error');
      setDisableEmail(false);
    }
  };

  const onSubmit = (e) => { 
    e.preventDefault();
    const data = {
      email: email,
    };
    setDisableEmail(true);
    submitRequest(data);
  };

  return (
    <div>
 
    <div className='loginLeft'>
      <h1>Auton<span>8</span></h1> 
          <form onSubmit={onSubmit} className='outerFormBox'>
          <h3> Forgot Your Password</h3>
            <Box mb={2}>
            <label>Email</label>
              <TextField
                InputProps={{
                  startAdornment: (
                   <AlternateEmailOutlinedIcon />
                  ),
                 }}
                fullWidth
                placeholder="someone@else.com"
                disabled={disableEmail}
                size="small"
                required
                name="email"
                type={'email'}
                onChange={(e) => {
                  setErrors({ status: false, message: '' })
                  setEmail(e.target.value);
                }}
                value={email}
                margin="normal"
                variant="outlined"
                className="filedfocus"
              />
            </Box>
            <Box margin="8px">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={captchaOnChange}
              />
            </Box>
            {
              errors.status && <Typography className='loginError'>
                {
                  errors.message
                }
              </Typography>
            }
            
            <Box alignItems="center" mt={3} mb={3}>
                <Button disabled={disableEmail || !recaptcha} 
                  type="submit" 
                  variant="contained" 
                  color="success"
                  style={{marginBottom:'15px'}}
                  className='loginBtn'>
                  {disableEmail ? <CircularProgress size={20} /> : 'Reset'}
                </Button>

                <Button
                  disabled={disableEmail}
                  onClick={() => {
                    history.goBack();
                  }}
                  variant="contained"
                  className='signupBtn'>
                  Back
                </Button>
            </Box>
          </form>

      </div>

      <div className='loginRight'>
      <h2>Welcome to <span>Auton <i>8</i></span></h2>
      <p>Automate your QA testing and achieve greater efficiency.</p>
      <h5>© 2023 Auton8. All rights reserved</h5>
    </div>

    </div>
  );
};

export default PasswordPage;
