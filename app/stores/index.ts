import { applyMiddleware, createStore } from "redux";
import themeReducer from "./themeReducer";
import thunk from "redux-thunk";
import { connect, ConnectedProps } from "react-redux";
import { toggleTheme } from "./themeActions";

export const store = createStore(themeReducer, applyMiddleware(thunk))

const mapStateToProps = (state: RootState) => ({
    appTheme: state.appTheme,
    error: state.error
})

const mapDispatchToProps = (dispatch: any) => ({
    toggleTheme: (themeType: string) => dispatch(toggleTheme(themeType))
})

export const connector = connect(mapStateToProps, mapDispatchToProps)
export type ReduxProps = ConnectedProps<typeof connector>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
