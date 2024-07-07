import {AllHomeType} from "../types/AddressesShema";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BACK_URL} from "../../../BACK_URL";
import {AddressesActions} from "../slice/AddressesSlice";

interface AllHomeProps {
  currentMonter: string | number
  dateStart: string
  dateEnd: string
  page: number
  limit: number
}


export const getAllAddress = createAsyncThunk<AllHomeType, AllHomeProps, { rejectValue: string }>(
  'api/addressList',
  async (props, thunkAPI) => {
    const {
      currentMonter,
      dateStart,
      dateEnd,
      page,
      limit,
    } = props
    try {
      const responce = await axios.get<AllHomeType>(`${BACK_URL}/api/monters/date`, {
        params: {
          monterId:currentMonter,
          dateStart,
          dateEnd,
          page,
          limit,
        }
      })
      if (!responce.data) throw new Error()

      const pageCount =Math.ceil(responce.data.count / limit)

      thunkAPI.dispatch(AddressesActions.setAddressList(responce.data))
      const arrPageCount = []
      for (let i = 0; i < pageCount; i++) arrPageCount.push({value: i, numberChild: i + 1})
      thunkAPI.dispatch(AddressesActions.setArrPage(arrPageCount))
      return responce.data
    } catch (e) {
      return thunkAPI.rejectWithValue('error')
    }
  }
)
