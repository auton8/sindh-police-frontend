import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Backdrop, Dialog} from '@material-ui/core';
import {lighten, makeStyles, alpha} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';

import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Axios from 'axios';
import BasicForm from './BasicForm';
import CmtAvatar from '@coremat/CmtAvatar';
import {UpdateProfileUtils} from './utils';
import {setAuthUser} from '@redux/actions/Auth';
import moment from 'moment';
import {MKV} from '@services/auth/Basic';
var CryptoJS = require('crypto-js');

const MySwal = withReactContent(Swal);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100vh',
    padding: '2%',
    margin: '0 auto',
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  pageTitle: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    lineHeight: 1.5,
    marginBottom: 20,
    textShadow: '6px 4px 6px hsla(0,0%,45.9%,.8)',
  },
  profileImage: {
    width: 135,
    height: 135,
    borderRadius: '50%',
    border: '1px solid #ccc',
  },
}));

const Toast = MySwal.mixin({
  target: '#updateProflieDialog',
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

const initalFormState = {
  username: '',
  email: '',
  full_name: '',
};

const UpdateProfileDialog = ({hideDialog}) => {
  // dialogState
  const classes = useStyles();
  const [formState, setFormState] = useState(initalFormState);
  const [selectedImage, setSelectedImage] = useState(null);
  const org = useSelector(({org}) => org);
  const user = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();

  const fileInputRef = React.useRef();
  useEffect(() => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      profile_pic: user.profile_pic,
    }));
  }, [user]);

  const handleOnChangeTF = (e) => {
    var {name, value} = e.target;
    e.preventDefault();
    setFormState((prevState) => ({...prevState, [name]: value}));
  };

  const showMessage = (icon, text, title) => {
    Toast.fire({
      icon,
      title: text,
    });
  };

  const validate = () => {
    return true;
  };

  const submitRequest = async (updateData) => {
    try {
      Axios.post('/user/updateProfile', updateData)
        .then((result) => {
          result = result.data;
          if (result.status) {
            showMessage('success', result.message, 'Success');
            const newUser = {
              ...user,
              full_name: updateData.full_name,
              profile_pic: updateData.profile_pic || user.profile_pic,
            };
            dispatch(setAuthUser(newUser));
            newUser.issue_date = moment();
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(newUser), MKV).toString();
            localStorage.setItem('cypress_user_1001', ciphertext);
            setTimeout(() => {
              hideDialog(false);
            }, 1000);
          } else {
            showMessage('error', result.message, 'Error');
            setFormState((prevState) => ({...prevState, is_loading: false}));
          }
        })
        .catch((e) => {
          showMessage('error', e, 'Error');
          setFormState((prevState) => ({...prevState, is_loading: false}));
        });
    } catch (e) {
      setFormState((prevState) => ({...prevState, is_loading: false}));
      showMessage('error', e, 'Error');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let {full_name, profile_pic} = formState;
        const formData = new FormData();
        formData.append('file', selectedImage);
        if (selectedImage) {
          setFormState((prevState) => ({...prevState, is_loading: true}));
          Axios.post('/user/uploadFile', formData)
            .then((response) => {
              if (response.data.success) {
                setFormState((prevState) => ({
                  ...prevState,
                  profile_pic: UpdateProfileUtils.createUrlFronName(response.data.fileName),
                }));
                let dataToSubmit = {
                  full_name,
                  profile_pic: response.data.fileName,
                };
                submitRequest(dataToSubmit);
              } else {
              setFormState((prevState) => ({...prevState, is_loading: false}));
                showMessage('error', response.data.message, 'Error');
              }
            })
            .catch((error) => {
              setFormState((prevState) => ({...prevState, is_loading: false}));
              showMessage('error', error, 'Error');
            });
        } else {
          let dataToSubmit = {
            full_name,
          };
          submitRequest(dataToSubmit);
        }
      } catch (e) {
        showMessage('error', e, 'Error');
      }
    }
  };

  const handleUploadFileChange = async (e) => {
    e.preventDefault();
    let file = e.target?.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();

      reader.onload = () => {
        setFormState((prevState) => ({...prevState, profile_pic: reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setTimeout(() => {
      hideDialog(false);
    }, 100);
  };

  const profileImage = (formState.profile_pic || '').includes('data:image')
    ? formState.profile_pic || ''
    : UpdateProfileUtils.createUrlFronName(formState.profile_pic);
  return (
    <PageContainer heading="" breadcrumbs={[]}>
      <Dialog
        id="updateProflieDialog"
        fullWidth={true}
        maxWidth={'md'}
        scroll={'body'}
        open={true}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose(event);
          }
        }}
        aria-labelledby="form-dialog-title">
        <CmtCard mt={20}>
          <CmtCardContent>
            <div>
              <Box className={classes.pageTitle} fontSize={{xs: 15, sm: 15}}>
                Update Profile
              </Box>
            </div>
            <Box display={'flex'} flexDirection={'row'}>
              <Box width={'20%'} justifyContent={'center'} alignItems={'center'}>
                <Box>
                  <CmtAvatar
                    className={classes.profileImage}
                    src={profileImage || '/images/default.jpg'}
                    alt={'title'}
                  />
                </Box>
                <Box>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    style={{marginTop: 10}}
                    variant="contained"
                    color="primary">
                    Change Photo
                  </Button>
                  <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleUploadFileChange} />
                </Box>
              </Box>
              <Box width={'80%'}>
                <form autoComplete="off" onSubmit={onSubmit}>
                  <Box mb={2}>
                    <BasicForm state={formState} handleOnChangeTF={handleOnChangeTF} />
                    <Box display={'flex'} justifyContent="flex-end" alignItems={'center'}>
                      <Button style={{marginTop: 10}} type="submit" variant="contained" color="primary">
                        Update
                      </Button>
                      <Button
                        style={{marginTop: 10, marginLeft: 20}}
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleClose}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Box>
          </CmtCardContent>
        </CmtCard>
      </Dialog>
      <Backdrop className={classes.backdrop} open={formState.is_loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </PageContainer>
  );
};

export default UpdateProfileDialog;
