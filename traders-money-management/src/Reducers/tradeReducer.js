import * as type from "../Constants/action-types";

export const tradeState = {
  bookedTrade: [],
  bookedTradeForm: {
    success: null,
    message: "",
  },
  openTrade: [],
  openTradeForm: {
    success: null,
    message: "",
  },
};

const getDateTimeToDisplay = (date) => {
  let tdate = new Date(date);
  return tdate.getMonth() + "/" + tdate.getDate() + "/" + tdate.getFullYear();
};

function rootReducer(state = tradeState, action) {
  switch (action.type) {
    case type.bookedTradeFetch:
      let tempActionPayload = action.payload.length > 0 ? action.payload : [];
      tempActionPayload.length &&
        tempActionPayload.map((data) => {
          data.entryDate = getDateTimeToDisplay(data.entryDate);
          data.exitDate = getDateTimeToDisplay(data.exitDate);
        });
      return {
        ...state,
        bookedTrade: tempActionPayload,
      };

    case type.bookedTradeForm:
      return {
        ...state,
        bookedTradeForm: action.payload,
      };

    case type.openTradeFetch: 
      let openTradePayload = action.payload.length > 0 ? action.payload : [];
      openTradePayload.length &&
        openTradePayload.map((data) => {
          data.entryDate = getDateTimeToDisplay(data.entryDate);
        });
      return {
        ...state,
        openTrade: openTradePayload,
      };

    case type.openTradeForm:
      return {
        ...state,
        openTradeForm: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
