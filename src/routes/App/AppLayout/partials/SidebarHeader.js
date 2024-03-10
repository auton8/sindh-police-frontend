import React, {useContext} from 'react';
import {Typography} from '@material-ui/core';
import CmtAvatar from '@coremat/CmtAvatar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useSelector} from 'react-redux';
import SidebarThemeContext from '@coremat/CmtLayouts/SidebarThemeContext/SidebarThemeContext';
import {UpdateProfileUtils} from './Header/HeaderLogin/UpdateProfileDialog/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px 16px 12px 16px',
    borderBottom: (props) => `solid 1px ${props.sidebarTheme.borderColor}`,
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
  },
  userSubTitle: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 0.25,
  },
}));

const SidebarHeader = () => {
  const {sidebarTheme} = useContext(SidebarThemeContext);
  const {authUser} = useSelector(({auth}) => auth);
  const org = useSelector(({org}) => org);
  const classes = useStyles({sidebarTheme});
  const profileImage = (authUser.profile_pic || '').includes('data:image')
    ? authUser.profile_pic || ''
    : UpdateProfileUtils.createUrlFronName(authUser.profile_pic);
  return (
    <div className={classes.root}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <CmtAvatar
          color="primary"
          size={75}
          variant="circular"
          alt="avatar"
          src={profileImage || '/images/default.jpg'}
        />

        <div className={classes.userInfo}>
          <div>
            <div
              className="mr-2"
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Typography className={classes.userSubTitle}>{authUser.full_name}</Typography>
            </div>
            {org && (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Typography className={classes.userSubTitle}>{org && org.name}</Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
