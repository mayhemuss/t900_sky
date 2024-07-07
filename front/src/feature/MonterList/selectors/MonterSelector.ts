

// export const getCurrentMonter = (state: StateSchema) => state.monter.currentMonter
// export const getDateStart = (state: StateSchema) => state.monter.dateStart
// export const getDateEnd = (state: StateSchema) => state.monter.dateEnd
import {StateSchema} from "../../../store/types/StateShema";

export const getMonterList = (state: StateSchema) => state.monter.monterList
export const getMonterListisLoading = (state: StateSchema) => state.monter.isLoading
export const getMonterListisError = (state: StateSchema) => state.monter.error
