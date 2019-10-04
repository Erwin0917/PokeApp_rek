import { createStore } from "redux";
import rootReducer from "../reducers/mainReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const mainStore = createStore(rootReducer, composeWithDevTools());

export default mainStore;
