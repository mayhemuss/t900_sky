import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import {MonterActions} from "../slice/monterSlice";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";


interface Tmonter {
  monterList: string[];
}

export const getAllMonter = createAsyncThunk<Tmonter, null, {}>(
  '/api/monters',
  async (authData, thunkAPI) => {
    try {
      const response = await axios.get<Tmonter>('http://192.168.0.101:5000/api/monter',);

      if (!response.data) {
        throw new Error();
      }
      thunkAPI.dispatch(MonterActions.setMonterList(response.data.monterList));
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('error');
    }
  },
);
