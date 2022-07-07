import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import Reducer from "../reducers";

const reducers = combineReducers({
  data: Reducer,
});
const middleware = [thunk];

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);
export default store;