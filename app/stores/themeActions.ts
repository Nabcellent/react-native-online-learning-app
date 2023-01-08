import { darkTheme, lightTheme } from "../constants";
import { SelectedThemeType } from "../constants/theme";
import { AppDispatch } from "./index";

export const TOGGLE_THEME_BEGIN = 'TOGGLE_THEME_BEGIN';
export const TOGGLE_THEME_SUCCESS = 'TOGGLE_THEME_SUCCESS';
export const TOGGLE_THEME_FAILURE = 'TOGGLE_THEME_FAILURE';

export const toggleThemeBegin = () => ({
    type: TOGGLE_THEME_BEGIN
})

export const toggleThemeSuccess = (selectedTheme: SelectedThemeType) => ({
    type: TOGGLE_THEME_SUCCESS,
    payload: { selectedTheme }
})

export const toggleThemeFailure = (error: any) => ({
    type: TOGGLE_THEME_FAILURE,
    payload: { error }
})

export const toggleTheme = (themeType: string) => (dispatch: AppDispatch) => {
    dispatch(toggleThemeBegin())

    switch (themeType) {
        case 'dark':
            dispatch(toggleThemeSuccess(darkTheme))
            break;
        case 'light':
            dispatch(toggleThemeSuccess(lightTheme))
            break;
        default:
            dispatch(toggleThemeFailure({ error: 'Invalid Theme Type.' }))
    }
}