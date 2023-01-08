import * as themeActionTypes from './themeActions'
import { selectedTheme } from "../constants";
import { AnyAction } from "redux";
import { SelectedThemeType } from "../constants/theme";

interface ThemeState {
    appTheme: SelectedThemeType,
    error: any
}

const initialState: ThemeState = {
    appTheme: selectedTheme,
    error: null
}

const themeReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case themeActionTypes.TOGGLE_THEME_BEGIN:
            return { ...state, error: null }
        case themeActionTypes.TOGGLE_THEME_SUCCESS:
            return { ...state, appTheme: action.payload.selectedTheme }
        case themeActionTypes.TOGGLE_THEME_FAILURE:
            return { ...state, error: action.payload.error }
        default:
            return state
    }
}

export default themeReducer