import {MonterSchema} from "../types/MonterSchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllMonter} from "../asyncThunc/getAllMonter";


const initialState: MonterSchema = {
  currentMonter: "",
  isLoading: false,
  monterList:[""]
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setCurrentMonter: (state, action: PayloadAction<string>) => {
      state.currentMonter = action.payload;
    },
    setMonterList: (state, action: PayloadAction<string[]>) => {
      state.monterList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMonter.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getAllMonter.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllMonter.rejected, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {actions: MonterActions} = loginSlice;
export const {reducer: MonterReducer} = loginSlice;
