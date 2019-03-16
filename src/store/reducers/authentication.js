import * as actionTypes from "../actions/actionTypes";

const initialState = {
  // complete me
  user: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // complete me
    case actionTypes.SET_CURRENT_USER:
      return {
        user: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
