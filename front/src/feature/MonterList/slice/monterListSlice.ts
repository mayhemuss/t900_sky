import {AllMontersList, MonterSchema} from "../types/MonterSchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllMontersList} from "../services/getAllMontersList";


const initialState: MonterSchema = {
  isLoading: false,
  monterList: undefined,
};


export const monterSlice = createSlice({
  name: 'monters',
  initialState,
  reducers: {

    setMonterList: (state, action: PayloadAction<AllMontersList[]>) => {
      state.monterList = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMontersList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getAllMontersList.fulfilled, (state, action) => {
        state.isLoading = false;

      })
      .addCase(getAllMontersList.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {actions: MonterActions} = monterSlice;
export const {reducer: MonterReducer} = monterSlice;
