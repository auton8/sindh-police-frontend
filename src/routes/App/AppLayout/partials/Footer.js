import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { NavLink } from 'react-router-dom';
import CmtImage from '@coremat/CmtImage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnRoot: {
    [theme.breakpoints.down('xs')]: {
      padding: '6px 12px',
      fontSize: 11,
    },
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  const date = new Date();

  return (
    <Box className={classes.root} {...props}>
      <Box display="flex" alignItems="center">
        <Hidden xsDown>
          <NavLink to="/">
            <Box display={'flex'} alignItems={"center"} justifyContent="center" cursor='pointer'>
              <Box fontSize={{ xs: 20, sm: 30 }} style={{ color: "black", fontWeight: 1000, textShadow: '2px 2px 3px hsla(218, 99%, 3%, 1)' }} variant="h1" >
                AUTON
              </Box>
              <CmtImage src='/images/A8.png' alt="logo" style={{ height: '40px', marginTop: '5px', transform: "rotate(270deg)" }} />
            </Box>
          </NavLink>
        </Hidden>
        <Box fontSize={{ xs: 12, sm: 14 }} component="p" color="text.disabled">
          Copyright AUTON8 © {date.getFullYear()}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
