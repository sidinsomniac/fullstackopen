import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducers";
import thunk from "redux-thunk";

const reducers = combineReducers({
    notification: notificationReducer
});
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root"));