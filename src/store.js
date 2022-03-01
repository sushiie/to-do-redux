import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { todoReducer } from "./Components/reducers/toDoReducer";

export const store = createStore(todoReducer, applyMiddleware(logger));
