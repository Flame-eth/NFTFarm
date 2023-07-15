export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});

export const setReferralLink = (link) => ({
  type: "SET_REFERRAL_LINK",
  payload: link,
});

export const setReferrer = (link) => ({
  type: "SET_REFERRER",
  payload: link,
});
