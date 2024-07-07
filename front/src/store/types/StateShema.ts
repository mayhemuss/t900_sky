import {MonterSchema} from "../../feature/MonterList/types/MonterSchema";
import {AddressesShema} from "../../feature/AddressList/types/AddressesShema";

export interface StateSchema {
  monter: MonterSchema;
  addresses: AddressesShema
}
