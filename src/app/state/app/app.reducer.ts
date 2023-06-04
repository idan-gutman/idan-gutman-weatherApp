import { createReducer, on } from "@ngrx/store";
import * as AppActions from './app.actions';

 export interface AppState {
    temperatureUnits: "C" | "F";

}
export const initialAppState: AppState = {
    temperatureUnits: 'C'
}

export const appReducer = createReducer(initialAppState,

    on(AppActions.changeTemperatureUnits, (state, action) => ({
        ...state,
        temperatureUnits: action.unit
    })),

);