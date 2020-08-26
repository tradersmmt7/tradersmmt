import {
  USER_DETAILS_SUCCESS,
  portfolioStatsForm,
} from "../Constants/action-types";
import { authGetCall, authPostCall } from "../Utils/apiCalls";

export const fetchUserDetails = () => {
  return (dispatch) => {
    authGetCall("/api/user/details").then((res) => {
      if (res.success) {
        let {
          fullName,
          emailId,
          subscriptionStatus,
          phone,
          subscriptionEndDate,
          portfolioStats,
        } = res.data[0];
        dispatch(
          userDetailsSuccess({
            user: {
              fullName,
              emailId,
              subscriptionStatus,
              phone,
              subscriptionEndDate,
              portfolioStats,
            },
          })
        );
      } // Write a else condition to redirect to login page
    });
  };
};

const userDetailsSuccess = (data) => ({
  type: USER_DETAILS_SUCCESS,
  payload: {
    ...data,
  },
});

export const updatePortfolioStats = (data) => {
  return (dispatch) => {
    authPostCall("/api/user/update/portfolioStats", data).then((res) => {
      if (res.success) {
        dispatch(
          updatePortfolio({
            success: true,
            message: res.message,
          })
        );
      } else {
        dispatch(
          updatePortfolio({
            success: false,
            message: res.message,
          })
        );
      }
    });
  };
};

const updatePortfolio = (data) => ({
  type: portfolioStatsForm,
  payload: {
    ...data,
  },
});
