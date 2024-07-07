import {StateSchema} from "../../../store/types/StateShema";

export const getAddressListisError = (state: StateSchema) => state.addresses.error
export const AddressIsLoading = (state: StateSchema) => state.addresses.isLoading
export const getDateStart = (state: StateSchema) => state.addresses.dateStart
export const getDateEnd = (state: StateSchema) => state.addresses.dateEnd
export const getCurrentMonter = (state: StateSchema) => state.addresses.currentMonter
export const getAddressList = (state: StateSchema) => state.addresses.addressList
export const getAddressPage = (state: StateSchema) => state.addresses.page
export const getAddressLimit = (state: StateSchema) => state.addresses.limit
export const getAddressesCount = (state: StateSchema) => state.addresses.pageCount
export const getarrPageCount = (state: StateSchema) => state.addresses.arrPageCount
