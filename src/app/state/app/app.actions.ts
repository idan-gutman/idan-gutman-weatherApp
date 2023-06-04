import { createAction, props } from "@ngrx/store";

export const changeTemperatureUnits = createAction('[user] changed temperature units', 
props<{ unit: "C" | "F" }>());
