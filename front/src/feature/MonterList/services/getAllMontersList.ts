import {createAsyncThunk} from "@reduxjs/toolkit";
import {AllMontersList} from "../types/MonterSchema";
import axios from "axios";
import {BACK_URL} from "../../../BACK_URL";
import {MonterActions} from "../slice/monterListSlice";

export const getAllMontersList = createAsyncThunk<AllMontersList, string, { rejectValue: string }>(
  'api/monterList',
  async ( id,thunkAPI) => {
    try {
      const responce = await axios.get<AllMontersList>(`${BACK_URL}/api/monters`,{headers:{'Access-Control-Allow-Origin': '*'}})
      if (!responce.data) throw new Error()
      // @ts-ignore
      thunkAPI.dispatch(MonterActions.setMonterList(responce.data))
      return responce.data
    } catch (e) {
      return thunkAPI.rejectWithValue('error')
    }
  }
)
