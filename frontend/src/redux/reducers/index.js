const initialState = {
  user: {
    token: "",
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKENREDUX":
      return {
        ...state,
        user: {
          ...state.user,
          token: action.payload,
        },
      };
    default:
      return state;
  }
};

export const setTokenRedux = (token) => ({
  type: "SET_TOKENREDUX",
  payload: token,
});

export default mainReducer;
