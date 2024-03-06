export const passAndFail = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'pass-or-fail',
      payload: value,
    });
  };
};
export const groupPosition = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'group-state',
      payload: value,
    });
  };
};

export const groupParent = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'group-parent',
      payload: value,
    });
  };
};

export const webDateFilter = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'web-filter',
      payload: value,
    });
  };
};
export const scenerioDateFilter = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'scenerio-filter',
      payload: value,
    });
  };
};

