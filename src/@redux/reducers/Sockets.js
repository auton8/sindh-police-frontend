const INIT_STATE = {
socket:null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'socket-initial': {
      state.socket = action.payload
      return state;
    }
    default:
      return state;
  }
};
