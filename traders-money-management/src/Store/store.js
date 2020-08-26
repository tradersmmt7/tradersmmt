import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import globalReducer, { initialState } from "../Reducers/reducer";
import tradeReducer, { tradeState } from "../Reducers/tradeReducer";

const middleWare = [];

middleWare.push(thunk);

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === "development",
});
middleWare.push(loggerMiddleware);

const rootReducer = combineReducers({
  globalReducer,
  tradeReducer,
});

const store = createStore(
  rootReducer,
  { ...initialState, ...tradeState },
  compose(applyMiddleware(...middleWare))
);

export default store;
