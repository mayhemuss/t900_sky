import {StateSchema} from "./types/StateShema";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {MonterReducer} from "./slice/monterSlice";

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    monter: MonterReducer,

  };

  return configureStore<StateSchema>({
    reducer: rootReducers,

    preloadedState: initialState,
  });
}
