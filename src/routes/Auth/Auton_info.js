import { Typography, Box } from '@material-ui/core';
import React from 'react';
import CmtImage from '@coremat/CmtImage';


const Info = ()=>{
    return <Box width="45%">
    <Box width="100%" display={'flex'} alignItems={"center"} justifyContent="center">
      <Box style={{ color: "black", fontSize: '40px', fontWeight: 1000, textShadow: '2px 2px 3px hsla(218, 99%, 3%, 1)' }} variant="h1" >
        AUTON
      </Box>
      <CmtImage src='/images/A8.png' alt="logo" style={{ height: '50px', marginTop: '5px', transform: "rotate(270deg)" }} />
    </Box>
    <Typography variant="h2" style={{ letterSpacing: '.8px', lineHeight: 1.5, marginTop: '40px' }}>
      Auton8 is a software automation platform that can perform tasks without human intervention. It simplifies
      testing by enabling functional, performance, and load testing, and generates reports to provide feedback on
      application quality. With Auton8, businesses can streamline their workflow, save valuable resources, and
      achieve greater efficiency.
    </Typography>
  </Box>
}

export default Info