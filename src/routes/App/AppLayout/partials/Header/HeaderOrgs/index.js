import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import CmtCard from '@coremat/CmtCard';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSelectedOrg, setPermissions } from '@redux/actions';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { deepOrange } from '@mui/material/colors';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Paper, ListItemText, ListItemIcon, MenuItem, MenuList, InputBase, styled, Popover, Tooltip, Avatar, Typography, Box, IconButton } from "@mui/material"
import Axios from 'axios';
import qs from 'qs';
import { useHistory } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { Constants } from '@services';
const sleep = (timeout) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), timeout));
};
const useStyles = makeStyles((theme) => ({
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 4,
      paddingBottom: 4,
    },
    '& .Cmt-card-content': {
      padding: '0 0 16px !important',
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
  iconRoot: {
    position: 'relative',
    color: alpha(theme.palette.common.white, 0.38),
    '&:hover, &.active': {
      color: theme.palette.common.white,
    },
  },
  counterRoot: {
    color: theme.palette.common.white,
    border: `solid 1px ${theme.palette.common.white}`,
    backgroundColor: 'red',
    width: 20,
  },
  scrollbarRoot: {
    height: 50,
    width: 300,
    padding: 5,
    overflow: 'hidden',
  },
  popoverRoot: {
    '& .MuiPopover-paper': {
      width: 300,
      marginTop: '-10px',
    },
  },
  scrollAdd: {
    minHeight: 50,
    height:300,
    padding: 5,
    overflow: "auto"
  }
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  backgroundColor: alpha(theme.palette.grey[400], 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[500], 0.15),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '95%',
    margin: "10px auto"
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const HeaderNotifications = () => {
  const classes = useStyles();
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const org = useSelector(({ org }) => org);
  const open = Boolean(anchorEl);
  const [serach, setSearch] = useState("");
  React.useEffect(() => {
    const getData = () => {
      return new Promise((resolve, reject) => {
        let data = qs.stringify({
          search: "",
          page: 0,
          pageSize: 1000,
          status: 1,
          type: 0,
          org_id: org._id,
        });

        var config = {
          method: 'post',
          url: '/organization',
          data: data,
        };

        Axios(config)
          .then((ans) => {
            if (ans.data.status) {
              setLoading(false)
              setData(ans.data.data)
            } else {
              setData([])
              setLoading(false)
            }
          })
          .catch((e) => {
            console.log(e);
            setLoading(false)
            setData([])
          });
      });
    };
    if (org) {
      getData();
    }
  }, [anchorEl])
  const dispatch = useDispatch();
  const onOpenPopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onClosePopOver = () => {
    setAnchorEl(null);
  };

  const onSelectOrg = async (e) => {
    onClosePopOver();
    try {
      let { item } = e.currentTarget.dataset;
      item = JSON.parse(item);
      if (org && org._id === item._id) {
        return;
      }
      if (item.type === 2) {
        let permsInit = Constants.INIT_PERMISSIONS;
        for (let key in permsInit) {
          permsInit[key] = false;
        }
        dispatch(setPermissions(permsInit));
        await sleep(500)
        dispatch(setPermissions(item.permissions));
      } else {
        let permsInit = Constants.INIT_PERMISSIONS;
        for (let key in permsInit) {
          permsInit[key] = true;
        }
        dispatch(setPermissions(permsInit));
      }

      await sleep(100)
      dispatch(setSelectedOrg(item));
      history.push("/")

    } catch (error) { }
  };

  return (org && <Box pr={2}>
    <Tooltip title="Projects">
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={onOpenPopOver}>
        <Avatar sx={{ bgcolor: deepOrange[500], width: 34, height: 34, mr: "7px" }}>
          {org?.name && org.name[0].toLocaleUpperCase()}
        </Avatar>
        <Typography variant="body2">
          {org.name}
        </Typography>
        <IconButton
          className={clsx(classes.iconRoot, 'Cmt-appIcon', {
            active: data && data.length > 0,
          })}>
          <KeyboardArrowDownIcon sx={{ color: "white", "&:hover": {}, transform: Boolean(anchorEl) ? "rotate(180deg)" : "none" }} />
        </IconButton >
      </Box>
    </Tooltip>

    <Popover
      className={classes.popoverRoot}
      sx={{ marginTop: "25px" }}
      id={open ? 'simple-popover' : undefined}
      open={open}
      anchorEl={anchorEl}
      onClose={onClosePopOver}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}>
      <CmtCard className={classes.cardRoot}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => { setSearch(e.target.value) }}
            value={serach}
            name="filter"
            disabled={loading}
          />
        </Search>
        <Paper style={{ overflow: loading === true ? "none" : 'auto', minWidth: "150px" }} className={classes.scrollAdd}>
          {
            !loading ? Array.isArray(data) && data.length > 0 ? <MenuList style={{ width: '100%' }}>
              {
                data.filter((item) => { // filter organizations
                  if (item && item.name) {
                    return item.name.toUpperCase().includes(serach.toUpperCase())
                  } else {
                    return false
                  }
                }).map((item, index) => {
                  return <MenuItem
                    onClick={onSelectOrg}
                    data-item={JSON.stringify(item)}
                    key={index}>
                    <ListItemIcon sx={{ marginRight: "20px" }}>
                      <Avatar>{item?.name && item.name[0].toLocaleUpperCase()}</Avatar>
                    </ListItemIcon>
                    <ListItemText> {item.name}</ListItemText>
                    {
                      item._id === org._id && <Tooltip title="Selected Projects">
                        <ListItemIcon>
                          <CheckBoxIcon sx={{ color: "green" }} />
                        </ListItemIcon>
                      </Tooltip>
                    }
                  </MenuItem>
                })
              }
            </MenuList> :
              <Box width="100%" display="flex" alignItems="center" justifyContent="center">
                <MenuItem>
                  No Projects
                </MenuItem>
              </Box> :
              <Box width="100%" display="flex" alignItems="center" justifyContent="center">
                <MenuItem>
                  <CircularProgress />
                </MenuItem>
              </Box>
          }
        </Paper>
      </CmtCard>
    </Popover>
  </Box>
  );
};

export default HeaderNotifications;
