import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import CmtImage from '@coremat/CmtImage';
import GridContainer from '@jumbo/components/GridContainer';

const Logo = ({ color, ...props }) => {
  const logoA8 = '/images/A8.png';
  return (
    <Box className="pointer" {...props}>
      <GridContainer justifyContent="center" alignItems="center">
        <NavLink style={{color:'white'}} to="/">
          <Box fontSize={{ xs: 20, sm: 30 }}>AUTON</Box>
        </NavLink>
        <Hidden xsDown>
          <NavLink to="/">
            <CmtImage src={logoA8} alt="logo" style={{ height: '40px', marginTop: '5px', transform: "rotate(270deg)" }} />
          </NavLink>
        </Hidden>
        <Hidden smUp>
          <NavLink to="/">
            <CmtImage src={logoA8} alt="logo" style={{ height: '40px', marginTop: '5px', transform: "rotate(270deg)" }} />
          </NavLink>
        </Hidden>
      </GridContainer>
    </Box>
  );
};

export default Logo;
