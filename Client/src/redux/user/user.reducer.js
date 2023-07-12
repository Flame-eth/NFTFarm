const INITIAL_STATE = {
  currentUser: null,
  referralLink: null,
  loading: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "SET_REFERRAL_LINK":
      return {
        ...state,
        referralLink: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
