import { filterTime } from "../../@services/Constants"
const INIT_STATE = {
  pass_or_fail: { type: 0, status: 0, time: 1 },
  groupState: [],
  parentss: null,
  is_api_edit: false,
  web_filter: {
    start: filterTime.start,
    end: filterTime.end
  },
  scenerio_filter: {
    start: filterTime.start,
    end: filterTime.end
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'pass-or-fail': {
      state.pass_or_fail = action.payload
      return state;
    }

    case 'group-state': {
      state.groupState = action.payload;
      return state;
    }

    case 'group-parent': {
      state.parentss = action.payload;
      return state;
    }
    case 'web-filter': {
      state.web_filter = action.payload;
      return state;
    }
    case 'scenerio-filter': {
      state.scenerio_filter = action.payload;
      return state;
    }
    default:
      return state;
  }
};
