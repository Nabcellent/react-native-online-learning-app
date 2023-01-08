import { applyMiddleware, createStore } from "redux";
import themeReducer from "./themeReducer";
import thunk from "redux-thunk";

export const store = createStore(themeReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
