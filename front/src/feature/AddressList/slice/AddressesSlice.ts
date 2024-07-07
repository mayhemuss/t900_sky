import {AddressesShema, AllHomeType} from "../types/AddressesShema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllAddress} from "../services/getAllAddresses";


const date = new Date()
const year = date.getFullYear()
const month = String(date.getMonth() + 1)
const day = String(date.getDate())
const initialdateEnd = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
const initialdateStart = `${year - 1}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`


const initialState: AddressesShema = {
  currentMonter: "",
  isLoading: false,
  addressList: undefined,
  dateStart: initialdateStart,
  dateEnd: initialdateEnd,
  page: 0,
  limit: 10,
  pageCount: 1,
  arrPageCount: [{value: 0, numberChild: 1}]
};


export const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {

    setCurrentMonter: (state, action: PayloadAction<string | number>) => {
      state.currentMonter = action.payload;
    },
    setAddressList: (state, action: PayloadAction<AllHomeType>) => {
      state.addressList = action.payload
    },
    setDateEnd: (state, action: PayloadAction<string>) => {
      state.dateEnd = action.payload
    },
    setDateStart: (state, action: PayloadAction<string>) => {
      state.dateStart = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload
    },
    setArrPage: (state, action: PayloadAction<{ value: number, numberChild: number }[]>) => {
      state.arrPageCount = action.payload

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddress.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;

      })
      .addCase(getAllAddress.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {actions: AddressesActions} = addressesSlice;
export const {reducer: AddressesReducer} = addressesSlice;
