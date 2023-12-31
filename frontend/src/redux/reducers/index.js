const initialState = {
  user: {
    token: "",
  },
  profile: {
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    id: "",
    propic: "",
    role: "",
  },
  artwork: {
    id: "",
  },
  like: {
    id: "",
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
    case "SET_NEWUSERNAME":
      return {
        ...state,
        profile: {
          ...state.profile,
          username: action.payload,
        },
      };
    case "SET_LIKEID":
      return {
        ...state,
        like: {
          ...state.like,
          id: action.payload,
        },
      };
    case "SET_NEWNAME":
      return {
        ...state,
        profile: {
          ...state.profile,
          name: action.payload,
        },
      };
    case "SET_NEWSURNAME":
      return {
        ...state,
        profile: {
          ...state.profile,
          surname: action.payload,
        },
      };
    case "SET_NEWEMAIL":
      return {
        ...state,
        profile: {
          ...state.profile,
          email: action.payload,
        },
      };
    case "SET_NEWPASSWORD":
      return {
        ...state,
        profile: {
          ...state.profile,
          password: action.payload,
        },
      };
    case "SET_NEWID":
      return {
        ...state,
        profile: {
          ...state.profile,
          id: action.payload,
        },
      };
    case "SET_NEWPROPIC":
      return {
        ...state,
        profile: {
          ...state.profile,
          propic: action.payload,
        },
      };
    case "SET_NEWROLE":
      return {
        ...state,
        profile: {
          ...state.profile,
          role: action.payload,
        },
      };
    case "SET_ARTWORKID":
      return {
        ...state,
        artwork: {
          ...state.artwork,
          id: action.payload,
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
export const setNewUsername = (username) => ({
  type: "SET_NEWUSERNAME",
  payload: username,
});
export const setNewName = (name) => ({
  type: "SET_NEWNAME",
  payload: name,
});
export const setNewSurname = (surname) => ({
  type: "SET_NEWSURNAME",
  payload: surname,
});
export const setNewEmail = (email) => ({
  type: "SET_NEWEMAIL",
  payload: email,
});
export const setNewPassword = (password) => ({
  type: "SET_NEWPASSWORD",
  payload: password,
});
export const setNewId = (id) => ({
  type: "SET_NEWID",
  payload: id,
});
export const setNewPropic = (propic) => ({
  type: "SET_NEWPROPIC",
  payload: propic,
});
export const setArtworkId = (id) => ({
  type: "SET_ARTWORKID",
  payload: id,
});
export const setLikeId = (id) => ({
  type: "SET_LIKEID",
  payload: id,
});
export const setNewRole = (role) => ({
  type: "SET_NEWROLE",
  payload: role,
});

export default mainReducer;
