import {StateSchema} from "./types/StateShema";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {MonterReducer} from "../feature/MonterList/slice/monterListSlice";
import {AddressesReducer} from "../feature/AddressList/slice/AddressesSlice";

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    monter: MonterReducer,
    addresses: AddressesReducer
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,

    preloadedState: initialState,
  });
}
