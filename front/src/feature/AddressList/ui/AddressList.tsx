import React from "react";
import OneAdress from "../../OneAdress";
import {useSelector} from "react-redux";
import {getAddressList} from "../selectors/AddressSelector";


function AddressList() {
  const AddressList = useSelector(getAddressList)

  return (
    <div>
      {AddressList ? (
        <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
          {Object.keys(AddressList.homes).map((address) => {
            const {home, entrances} = AddressList.homes[address];

            return (
              <OneAdress
                key={home.address + home.id}
                home={home}
                entrances={entrances}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddressList;
