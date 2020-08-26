import { bookedTradeFetch, bookedTradeForm } from "../Constants/action-types";
import { authPostCall, authGetCall } from "../Utils/apiCalls";

export const fetchingTrades = () => {
  return (dispatch) => {
    authGetCall("/api/user/fetch/bookedTrade").then((res) => {
      if (res.success) {
        dispatch(fetchBookedTrade(res.data));
      }
    });
  };
};

const fetchBookedTrade = (data) => ({
  type: bookedTradeFetch,
  payload: data,
});

export const saveBookedTrades = (data) => {
  return (dispatch) => {
    authPostCall("/api/user/save/bookedTrade", data).then((res) => {
      if (res.success) {
        dispatch(fetchingTrades());
        dispatch(
          updateBookedTradeForm({
            success: true,
            message: res.message,
          })
        );
      } else {
        dispatch(
          updateBookedTradeForm({
            success: false,
            message: res.message,
          })
        );
      }
    });
  };
};

const updateBookedTradeForm = (data) => ({
  type: bookedTradeForm,
  payload: {
    ...data,
  },
});

export const deleteBookedTrades = (data) => {
  return (dispatch) => {
    authPostCall("/api/user/delete/bookedTrade", data).then((res) => {
      if (res.success) {
        dispatch(fetchingTrades());
      } else {
      }
    });
  };
};


export const updateBookedTradeDetail = (data) => {
  return (dispatch) => {
    authPostCall("/api/user/update/bookedTrade", data).then((res) => {
      if (res.success) {
        dispatch(fetchingTrades());
      } else {
      }
    });
  };
}