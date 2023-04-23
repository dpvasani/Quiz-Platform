import rootReducer from "./Reducer/IndexReducer";
import { createStore } from "redux";

const store = createStore(rootReducer);

export default store;
