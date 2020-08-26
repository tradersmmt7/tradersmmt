import {
  possibleTradeForm,
  possibleTradeFetch,
  possibleTradeUpdate,
} from "../Constants/action-types";
import { authPostCall, authGetCall } from "../Utils/apiCalls";

export const fetchPossibleTrade = () => {
  return (dispatch) => {
    authGetCall("/api/user/fetch/possibleTrade").then((res) => {
      if (res.success) {
        dispatch(
          updatePossibleTradeFetch({
            success: true,
            data: res.data,
            message: res.message,
          })
        );
      } else {
        dispatch(
          updatePossibleTradeFetch({
            success: false,
            data: [],
            message: res.message,
          })
        );
      }
    });
  };
};

const updatePossibleTradeFetch = (data) => ({
  type: possibleTradeFetch,
  payload: {
    ...data,
  },
});

export const savePossibleTrade = (data) => {
  return (dispatch) => {
    authPostCall("/api/user/save/possibleTrade", data).then((res) => {
      if (res.success) {
        dispatch(fetchPossibleTrade());
        dispatch(
          updatePossibleTradeForm({
            success: true,
            message: res.message,
          })
        );
      } else {
        dispatch(
          updatePossibleTradeForm({
            success: false,
            message: res.message,
          })
        );
      }
    });
  };
};

const updatePossibleTradeForm = (data) => ({
  type: possibleTradeForm,
  payload: {
    ...data,
  },
});

export const updatePossibleTradeDetail = (data) => {
  return (dispatch) => {
    authPostCall("/api/user/update/possibleTrade", data).then((res) => {
      if (res.success) {
        dispatch(fetchPossibleTrade());
      } else {
      }
    });
  };
};

const updatePossibleTradeAction = (data) => ({
  type: possibleTradeUpdate,
  payload: {
    ...data,
  },
});



export const deletePossibleTradeDetail = (data) => {
  return (dispatch) => {
    authPostCall("/api/user/delete/possibleTrade", data).then((res) => {
      if (res.success) {
        dispatch(fetchPossibleTrade());
      } else {
      }
    });
  };
};

const deletePossibleTradeAction = (data) => ({
  type: possibleTradeUpdate,
  payload: {
    ...data,
  },
});
