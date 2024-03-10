import React, { useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import CmtVertical from '@coremat/CmtNavigation/Vertical';
import { getMenuFull, getMenuLess } from '../menus';
import { useEffect } from 'react';

const useStyles = makeStyles(() => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 200px)',
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 72px)',
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)',
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 200px)',
    },
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const orgs = useSelector(({ orgs }) => orgs);
  const org = useSelector(({ org }) => org);
  const [menus, setMenus] = useState(getMenuLess());
  const prePermissions = useSelector(({ permissions }) => permissions);



  useEffect(() => {
    setTimeout(() => {
      try {
        Array.isArray(orgs) && orgs.map((data) => {
          if (org?._id === data._id) {
            const permissions = data.permissions === undefined ? prePermissions : data.permissions
            setMenus(getMenuFull(permissions, orgs));
          }
        })
      } catch (error) {
        console.log(error)
      }
    }, 500);
  }, [orgs, org]);

  return (
    <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
      <CmtVertical menuItems={menus} />
    </PerfectScrollbar>
  );
};

export default SideBar;
