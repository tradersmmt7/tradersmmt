import * as type from "../Constants/action-types";

export const initialState = {
  loggedIn: false,
  userId: null,
  userDetails: {
    name: "",
    emailId: "",
    subscriptionStatus: null,
    phone: "",
    subscriptionEndDate: "",
  },
  portFolioStatsForm: {
    success: null,
    message: "",
  },
  portfolioStats: [
    {
      bookedPandL: 0,
      currentCapital: 0,
      id: null,
      openPandL: 0,
      riskPerTrade: 0,
      riskPerTradeData: 0,
      startingCapital: 0,
      worstCaseScenario: 0,
      worstCaseScenarioData: 0,
    },
  ],
  possibleTradeForm: {
    success: null,
    message: "",
  },
  possibleTrade: {
    success: null,
    data: [],
    message: "",
  },
  loginStatus: {
    success: null,
    message: "",
  },
  registrationStatus: {
    success: null,
    message: "",
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        userId: action.payload.userId,
        loginStatus: action.payload.loginStatus,
      };
    case type.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        userId: action.payload.userId,
        loginStatus: action.payload.loginStatus,
      };
    case type.USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: {
          emailId: action.payload.user.emailId,
          fullName: action.payload.user.fullName,
          phone: action.payload.user.phone,
          subscriptionEndDate: action.payload.user.subscriptionEndDate,
          subscriptionStatus: action.payload.user.subscriptionStatus,
        },
        portfolioStats: [...action.payload.user.portfolioStats],
      };
    case type.registerSuccess:
      return {
        ...state,
        registrationStatus: action.payload,
      };
    case type.registerError:
      return {
        ...state,
        registrationStatus: action.payload,
      };
    case type.portfolioStatsForm:
      return {
        ...state,
        portFolioStatsForm: action.payload,
      };

    case type.possibleTradeForm:
      return {
        ...state,
        possibleTradeForm: action.payload,
      };

    case type.possibleTradeFetch:
      return {
        ...state,
        possibleTrade: action.payload,
      };

    case type.logoutClearData:
      return action.payload;
    default:
      return state;
  }
}

export default rootReducer;
