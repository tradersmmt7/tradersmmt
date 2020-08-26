import * as type from "../Constants/action-types";
import { postCall } from "../Utils/apiCalls";
import { setCookie, getCookie, eraseCookie } from "../Utils/Cookies";
import { initialState } from "../Reducers/reducer";

export const login = (userObj) => {
  return (dispatch) => {
    postCall("/user/login", userObj).then((res) => {
      if (res.success) {
        setCookie("token", res.data[0].token, 2);
        setCookie("userId", res.data[0].userId, 2);
        dispatch(
          loginSuccess({
            userId: res.data[0].userId,
            loggedIn: true,
            loginStatus: {
              success: true,
              message: res.message,
            },
          })
        );
      } else {
        dispatch(
          loginFailure({
            userId: null,
            loggedIn: false,
            loginStatus: {
              success: false,
              message:
                typeof res.message === "string"
                  ? res.message
                  : "Please try again later",
            },
          })
        );
        return false;
      }
    });
  };
};

const loginSuccess = (data) => ({
  type: type.LOGIN_SUCCESS,
  payload: {
    ...data,
  },
});

const loginFailure = (data) => ({
  type: type.LOGIN_FAILURE,
  payload: {
    ...data,
  },
});

export const registration = (userObj) => {
  return (dispatch) => {
    postCall("/user/register", userObj).then((res) => {
      if (res.success) {
        dispatch(
          registerSuccess({
            success: true,
            message: res.message,
          })
        );
      } else {
        dispatch(
          registerError({
            success: false,
            message:
              typeof res.message === "string"
                ? res.message
                : "Please try again later",
          })
        );
        return false;
      }
    });
  };
};

const registerSuccess = (data) => ({
  type: type.registerSuccess,
  payload: {
    ...data,
  },
});
const registerError = (data) => ({
  type: type.registerError,
  payload: {
    ...data,
  },
});

export const verifyUser = () => {
  return (dispatch) => {
    if (getCookie("userId") && getCookie("token")) {
      dispatch(
        loginSuccess({
          userId: getCookie("userId"),
          loggedIn: true,
          loginStatus: {
            success: true,
            message: "Thanks! For staying connected with us.",
          },
        })
      );
    } else {
      dispatch(
        loginFailure({
          userId: null,
          loggedIn: false,
          loginStatus: {
            success: null,
            message: null,
          },
        })
      );
      return false;
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    eraseCookie("userId");
    eraseCookie("token");
    dispatch(logoutClear(initialState));
    window.open('/',"_self");
  };
};


const logoutClear = (data) => ({
  type: type.logoutClearData,
  payload: {
    ...data,
  },
});
