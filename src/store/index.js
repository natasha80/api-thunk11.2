import { createStore, combineReducers, applyMiddleware } from "redux";
import serviceListReducer from "../reducers/serviceList";
import serviceAddReducer from "../reducers/serviceAdd";
import thunk from "redux-thunk";

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceAdd: serviceAddReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;