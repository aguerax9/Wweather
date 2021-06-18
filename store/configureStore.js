import { createStore } from "redux";
import manageHistoric from "./reducer/historicReducer";

export default createStore(manageHistoric);