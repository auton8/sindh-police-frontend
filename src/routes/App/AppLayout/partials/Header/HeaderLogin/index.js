import React, { useContext, useState } from 'react';
import { Paper, Popover, Typography, Box, Tooltip, Button } from '@mui/material';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { AuhMethods } from '@services/auth';
import CmtCard from '@coremat/CmtCard';
import SidebarThemeContext from '@coremat/CmtLayouts/SidebarThemeContext/SidebarThemeContext';
import AddNew from './AddNew';
import UpdateProfileDialog from './UpdateProfileDialog';
import './index.css';
import CmtAvatar from '@coremat/CmtAvatar';
import { UpdateProfileUtils } from './UpdateProfileDialog/utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px 16px 12px 16px',
    borderBottom: (props) => `solid 1px ${props.sidebarTheme.borderColor}`,
  },
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 4,
      paddingBottom: 4,
    },
    '& .Cmt-card-content': {
      padding: '0 0 16px !important',
    },
  },
  userInfo: {
    paddingTop: 24,
    transition: 'all 0.1s ease',
    height: 75,
    opacity: 1,
    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      height: 0,
      paddingTop: 0,
      opacity: 0,
      transition: 'all 0.3s ease',
    },
  },
  userTitle: {
    color: (props) => props.sidebarTheme.textDarkColor,
    marginBottom: 8,
  },
  userSubTitle: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 0.25,
  },
}));

const SidebarHeader = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const { sidebarTheme } = useContext(SidebarThemeContext);
  const { authUser } = useSelector(({ auth }) => auth);
  const classes = useStyles({ sidebarTheme });
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onLogoutClick = () => {
    handlePopoverClose();
    dispatch(AuhMethods.basic.onLogout());
  };

  const profileImage = (authUser.profile_pic || '').includes('data:image')
    ? authUser.profile_pic || ''
    : UpdateProfileUtils.createUrlFronName(authUser.profile_pic);
  return (
    <Box pr={2}>
      <Tooltip title="Profile Setting">
        <div className={classes.userInfo} onClick={handlePopoverOpen}>
          <div
            className="pointer"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <div className="mr-2">
              <Typography className={classes.userSubTitle}>{authUser.full_name}</Typography>
            </div>
            <KeyboardArrowDownIcon sx={{ "&:hover": {}, transform: Boolean(anchorEl) ? "rotate(180deg)" : "none" }} />

          </div>
        </div>
      </Tooltip>

      {open && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          container={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <CmtCard className={classes.cardRoot}>
            <Paper className="profile_menu_container" elevation={8}>
              <Box>
                <Box className="profile_menu_header">
                  <Box className="profile_menu_header_pic">
                    <CmtAvatar
                      color="primary"
                      size={60}
                      variant="circular"
                      alt="avatar"
                      src={profileImage || '/images/default.jpg'}
                    />
                  </Box>
                  <Box className="profile_menu_header_info">
                    <Box className="profile_menu_header_info_name">{authUser.full_name}</Box>
                    <Box className="profile_menu_header_info_email">{authUser.email}</Box>
                    <Box className="profile_menu_header_view_profile">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handlePopoverClose();
                          setShowProfileDialog(true);
                        }}>
                        View Profile
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box className="profile_menu_items">
                  <Box
                    onClick={() => {
                      handlePopoverClose();
                      setShowProfileDialog(true);
                    }}
                    className="profile_menu_item">
                    <p>Profile Update</p>
                  </Box>
                  <Box
                    onClick={() => {
                      handlePopoverClose();
                      setShowDialog(true);
                    }}
                    className="profile_menu_item">
                    <p>Password Change</p>
                  </Box>

                  <Box onClick={onLogoutClick} className="profile_menu_item">
                    <p>Logout</p>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box></Box>
              </Box>
            </Paper>
          </CmtCard>
        </Popover>
      )}
      {showDialog && <AddNew hideDialog={setShowDialog} />}
      {showProfileDialog && <UpdateProfileDialog hideDialog={setShowProfileDialog} />}
    </Box>
  );
};

export default SidebarHeader;
