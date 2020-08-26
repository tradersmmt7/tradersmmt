import { openTradeFetch, openTradeForm } from "../Constants/action-types";
import { authPostCall, authGetCall } from "../Utils/apiCalls";

export const fetchingOpenTrades = () => {
  return (dispatch) => {
    authGetCall("/api/user/fetch/openTrade").then((res) => {
      if (res.success) {
        dispatch(fetchOpenTrade(res.data));
      }
    });
  };
};

const fetchOpenTrade = (data) => ({
  type: openTradeFetch,
  payload: data,
});

export const saveOpenTrade = (data) => {
  return (dispatch) => {
    authPostCall("/api/user/save/openTrade", data).then((res) => {
      if (res.success) {
        dispatch(fetchingOpenTrades());
        dispatch(
          updateOpenTradeForm({
            success: true,
            message: res.message,
          })
        );
      } else {
        dispatch(
          updateOpenTradeForm({
            success: false,
            message: res.message,
          })
        );
      }
    });
  };
};

const updateOpenTradeForm = (data) => ({
  type: openTradeForm,
  payload: {
    ...data,
  },
});

export const deleteOpenTrades = (data) => {
  return (dispatch) => {
    authPostCall("/api/user/delete/openTrade", data).then((res) => {
      if (res.success) {
        dispatch(fetchingOpenTrades());
      } else {
      }
    });
  };
};

export const updateOpenTradeDetail = (data) => {
  return (dispatch) => {
    authPostCall("/api/user/update/openTrade", data).then((res) => {
      if (res.success) {
        dispatch(fetchingOpenTrades());
      } else {
      }
    });
  };
}