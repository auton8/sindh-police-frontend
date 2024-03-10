import React, { useState , useEffect } from 'react';
import CmtVerticalLayout from '@coremat/CmtLayouts/Vertical';
import { Box, Typography } from "@mui/material"
import CmtHeader from '@coremat/CmtLayouts/Vertical/Header';
import Header from '../../partials/Header';
import CmtSidebar from '@coremat/CmtLayouts/Vertical/Sidebar';
import SidebarHeader from '../../partials/SidebarHeader';
import SideBar from '../../partials/SideBar';
import CmtContent from '@coremat/CmtLayouts/Vertical/Content';
import CmtFooter from '@coremat/CmtLayouts/Vertical/Footer';
import Footer from '../../partials/Footer';
import { useSelector } from 'react-redux';
import defaultContext from '@jumbo/components/contextProvider/AppContextProvider/defaultContext';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ContentLoader from '@jumbo/components/ContentLoader';
import moment from 'moment';

const layoutOptions = {
  headerType: defaultContext.headerType,
  footerType: 'fixed',
  sidebarType: defaultContext.sidebarType,
  isSidebarFixed: defaultContext.isSidebarFixed,
  isSidebarOpen: false,
  showTourOpt: false,
  showFooterOpt: true,
  miniSidebarWidth: 80,
  layoutStyle: defaultContext.layoutType,
  drawerBreakPoint: defaultContext.drawerBreakPoint,
  sidebarWidth: 240,
};

const VerticalDefault = ({ children }) => {
  const org = useSelector(({ org }) => org);
  const [selectedOrgIndication, setSelectedOrgIndication] = useState("")
  const [showSubscriptionPlan, setShowSubscriptionPlan] = useState(true);
  useEffect(() => {
    try {
      if (org && org.subscription && org.subscription?.expiry_date) {
        var diffDuration = moment(org.subscription.expiry_date).diff(new Date(), 'days')
        if (diffDuration < 1) setSelectedOrgIndication("You have exceeded the maximum number of users in your plan.")
        else setSelectedOrgIndication(` Your free trail expires in ${diffDuration} ${diffDuration === 1 ? "day" : "days"} `)
        setShowSubscriptionPlan(true)
      } else {
        setShowSubscriptionPlan(false)
      }
    } catch (e) {
      console.log("error", e);
    }
  }, [org])

  return (
    <CmtVerticalLayout
      className="verticalDefaultLayout"
      layoutOptions={layoutOptions}
      header={
        <>
          <CmtHeader>
            <Header />
          </CmtHeader>
          {
            org && showSubscriptionPlan && <Box sx={{ paddingLeft: "19%", width: "100%", height: "35px", backgroundColor: "#f4cb55", position: "fixed", top: "75px", zIndex: 8, display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InfoIcon sx={{ color: "red", cursor: "pointer" }} />
                <Typography sx={{ marginRight: "4px", marginLeft: "10px" }} variant='body1'>
                  {selectedOrgIndication}
                </Typography>
                <Typography sx={{ cursor: "pointer", marginRight: "8px" }} variant='body1'>
                  <u> Contact us to discuss options.</u>
                </Typography>
                <CloseIcon onClick={() => { setShowSubscriptionPlan(false) }} sx={{ cursor: "pointer", color: "balck", "&:hover": { color: "red" } }} />
              </Box>
            </Box>
          }

        </>
      }
      sidebar={
        <CmtSidebar>
          <SidebarHeader />
          <SideBar />
        </CmtSidebar>
      }
      footer={
        <CmtFooter>
          <Footer />
        </CmtFooter>
      }>
      <CmtContent>
        {children}
        <ContentLoader />
      </CmtContent>
    </CmtVerticalLayout>
  );
};

export default VerticalDefault;
