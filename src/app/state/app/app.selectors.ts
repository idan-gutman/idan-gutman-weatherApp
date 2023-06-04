import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";


export const root = createFeatureSelector<AppState>('app');
export const temperatureUnits = createSelector(root, state => state.temperatureUnits);