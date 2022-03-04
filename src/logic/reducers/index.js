import { combineReducers } from "redux"
import countReducer from "./countReduce"
import { ModalStatus } from "./modalReducers";

 const reducers = combineReducers({
    count : countReducer,
    modal : ModalStatus
});

export default reducers;