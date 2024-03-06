import DialogTitle from '@mui/material/DialogTitle';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Tooltip,
  TextField,
  CircularProgress,
  Checkbox,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import Axios from 'axios';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  target: '#myTest',
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

const flexDirection_Column = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' };
const flexDirection_Row = { display: 'flex', alignItems: 'center', justifyContent: 'center' };

function Label({ handlePopoverClose, close, type, rowData, setSelectedRows, setRefereshData }) {
  const [color, setColor] = useState([]);
  const [remainingColor, setRemainingColor] = useState([]);
  const [reload, setReload] = useState(0);
  const [title, setTitle] = useState('');
  const [state, setState] = useState({ add: true, create: false, edit: false });
  const [loading, setLoading] = useState(1);
  const [item, setItem] = useState({});
  const [apiColor, setApiColor] = useState([]);

  const [edit, setEdit] = useState({});

  const closeDialog = () => {
    setTimeout(() => {
      handlePopoverClose();
      setSelectedRows([]);
      setRefereshData(true);
      close(false);
    }, 100);
  };
  const showMessage = (icon, text) => {
    Toast.fire({
      icon,
      title: text,
    });
  };

  const limitOfViewColor = (temp) => {
    var remainingSelect = [];
    var remainingUnselect = [];
    var first12 = [];
    temp.map((data, index) => {
      if (index >= 12) {
        if (data.selected) {
          remainingSelect.push(data);
        } else {
          remainingUnselect.push(data);
        }
      } else {
        first12.push(data);
      }
    });

    let updateTemp = first12.concat(remainingSelect);
    setRemainingColor(remainingUnselect);
    setColor(updateTemp);
    setReload(reload + 1);
  };

  useEffect(() => {
    const testRunSync = async () => {
      return new Promise(() => {
        var config = {
          method: 'get',
          url: '/colors',
        };
        Axios(config)
          .then((ans) => {
            if (ans.data.status) {
              let temp = ans.data.data;
              temp.map((item) => {
                var select = false;
                var label = item.label;
                if (rowData[0].tags) {
                  rowData[0].tags.map((val) => {
                    if (item.id === val.id) {
                      select = true;
                      label = val.label;
                    }
                  });
                }

                item.selected = select;
                item.label = label;
              });

              setApiColor(temp);
              limitOfViewColor(temp);
              setLoading(false);
            } else {
              showMessage('error', ans.data.message);
            }
          })
          .catch((e) => {
            showMessage('error', e);
          });
      });
    };
    testRunSync();
  }, []);

  const onChangeTage = async (check, item) => {
    if (check.target.checked) {
      let temp = color.concat(remainingColor);
      temp.map((value) => {
        var select = value.selected;
        if (item.id === value.id) {
          select = true;
        }
        value.selected = select;
      });
      limitOfViewColor(temp);
    } else {
      let temp = color.concat(remainingColor);
      temp.map((value) => {
        var select = value.selected;
        var label = value.label;
        if (item.id === value.id) {
          select = false;
          label = '';
        }
        value.selected = select;
        value.label = label;
      });
      limitOfViewColor(temp);
    }
  };

  const getGroupItemType = (rowDataType) => {
    if (rowDataType === 1) {
      return "test";
    } else if (rowDataType === 3) {
      return "api";
    }
    return "group"
  }

  const setColorInDB = (newColors) => {
    const newTags = newColors.filter((eachColor) => eachColor.selected === true).map((eachColor) => ({
      id: eachColor.id,
      label: eachColor.label,
      color: eachColor.color,
      name: eachColor.name
    }))
    setState({ add: true, create: false, edit: false });
    try {
      const currentType = type === "group" ? getGroupItemType(rowData[0].name.type) : type;
      const params = {
        type: currentType,
        resourceId: rowData[0]._id,
        tags: newTags,
      };
      var config = {
        method: 'post',
        url: '/user/updateTags',
        data: params,
      };

      Axios(config).then((res) => {
        if (res.data.status) {
          closeDialog()
        } else {
          showMessage('error', res.data.message);
        }
      });
    } catch (error) {
      showMessage('error', error);
    }
  };

  const editLabel = async () => {
    let tempData = { ...item, label: title, color: item.color };
    let temp = color.concat(remainingColor);
    temp.map((value) => {
      var select = value.selected;
      var label = value.label;

      if (edit.id === tempData.id && value.id === edit.id) {
        select = false;
        label = '';
      }
      if (tempData.id === value.id) {
        select = true;
        label = tempData.label;
      }
      value.selected = select;
      value.label = label;
    });
    limitOfViewColor(temp);
  };

  const CreateNewLabel = async () => {
    if (state.create) {
      if (item.color !== '') {
        let tempData = { ...item, label: title, color: item.color };
        if (!tempData.selected) {
        } else {
          setState({ add: true, create: false, edit: false });
        }
        let temp = color.concat(remainingColor);
        temp.map((value) => {
          var select = value.selected;
          var label = value.label;
          if (!tempData.selected && tempData.id === value.id) {
            select = true;
            label = tempData.label;
          }
          value.selected = select;
          value.label = label;
        });
        limitOfViewColor(temp);
      } else {
        showMessage('error', 'select color ');
      }
    } else {
      setTitle('');
      setItem({ ...item, color: '' });
      setState({ add: false, create: true, edit: false });
    }
  };

  return (
    reload >= 0 && (
      <Dialog maxWidth="xs" fullWidth="xs" onClose={closeDialog} open={true}>
        <DialogTitle style={{ ...flexDirection_Row }} disableEnforceFocus enforceFocus={false}>
          Labels
          {state.add === false && (
            <span style={{ position: 'absolute', left: 40, cursor: 'pointer' }}>
              <Tooltip title={'Back'}>
                <ArrowBackIosIcon
                  onClick={() => {
                    setState({ add: true, create: false, edit: false });
                  }}
                />
              </Tooltip>
            </span>
          )}
          <span style={{ position: 'absolute', right: 40, cursor: 'pointer' }}>
            <Tooltip title={'Close'}>
              <CloseIcon style={{ color: 'red' }} onClick={closeDialog} />
            </Tooltip>
          </span>
        </DialogTitle>

        <DialogContent>
          {(state.create || state.edit) && (
            <Box style={{ ...flexDirection_Column }}>
              <Box style={{ width: '100%' }}>
                <Typography variant="body1">Title</Typography>
                <TextField
                  style={{ '.MuiOutlinedInput-input': { height: '5px' } }}
                  fullWidth
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Box>
              <Box width="100%" marginTop="20px">
                <Typography variant="body1">Select a color</Typography>
                <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                  {apiColor.map((label) => {
                    return (
                      <Button
                        style={{
                          backgroundColor: label.color,
                          width: '17%',
                          margin: '5px 0px',
                          marginRight: '2.5px',
                          height: '50px',
                          border: item.color === label.color && '3px solid  black',
                        }}
                        onClick={() => {
                          setItem(label);
                        }}></Button>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          )}
          {!loading &&
            state.add &&
            color.map((item) => {
              return (
                <Box width="100%" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <Checkbox
                    checked={item.selected}
                    onChange={(e) => {
                      onChangeTage(e, item);
                    }}
                  />

                  <Box
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    width="80%"
                    bgcolor={item.color}
                    mt="5px"
                    mb="5px"
                    borderRadius={1}
                    minHeight="4vh">
                    <Typography variant="body1" style={{ marginLeft: '10px' }}>
                      {item.label}
                    </Typography>
                  </Box>
                  <span style={{ cursor: 'pointer' }}>
                    <Tooltip
                      title={'Edit label'}
                      onClick={() => {
                        setEdit(item);
                        setItem(item);
                        setTitle(item.label);
                        setState({ add: false, create: false, edit: true });
                      }}>
                      <EditIcon />
                    </Tooltip>
                  </span>
                </Box>
              );
            })}

          {loading && (
            <Box minHeight="30vh" width="100&" style={{ ...flexDirection_Row }}>
              <CircularProgress />
            </Box>
          )}

          <Box style={{ marginTop: '15px', width: '95%', display: 'flex', marginLeft: '10px' }}>
            {!loading && (state.add || state.create) && (
              <Tooltip title="Create  label" style={{ marginRight: '10px' }}>
                <Button
                  onClick={() => {
                    CreateNewLabel();
                  }}
                  variant="contained"
                  color="primary">
                  Create
                </Button>
              </Tooltip>
            )}
            <Box width={"100%"} display="flex" justifyContent={"flex-end"} alignItems="flex-end" >
              {!loading && (state.add) && (
                <Tooltip title="Create  label" style={{ marginRight: '10px' }}>
                  <Button
                    onClick={() => {
                      setColorInDB(color)
                    }}
                    variant="contained"
                    color="primary">
                    Apply
                  </Button>
                </Tooltip>
              )}
            </Box>


            {!loading && state.edit && (
              <Tooltip title={'Edit  label'} onClick={editLabel}>
                <Button variant="contained" color="primary">
                  Done
                </Button>
              </Tooltip>
            )}
          </Box>
          <Box width="100%" mt="15px">
            {state.add && color.length !== 30 && (
              <Tooltip
                title={'Show more Labels'}
                onClick={() => {
                  let temp = color;
                  setColor(temp.concat(remainingColor));
                }}>
                <Button disabled={loading} fullWidth>
                  Show More
                </Button>
              </Tooltip>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    )
  );
}

export default Label;
