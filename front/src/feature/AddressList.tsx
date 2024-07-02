import React, {useEffect, useState} from "react";
import axios from "axios";
import {BACK_URL} from "../BACK_URL";
import OneAdress from "./OneAdress";
import {AllHomeType} from "../app/types/Types";

interface AdressListProps {
  currentMonter: string | number;
  dateEnd: string;
  dateStart: string;
}

function AddressList({currentMonter, dateEnd, dateStart}: AdressListProps) {
  const [homeList, setHomeList] = useState<AllHomeType | null>(null);

  const [arrAdress, setArrAdress] = useState<string[] | []>([]);


  useEffect(() => {
    try {
      axios
        .get(`${BACK_URL}/api/monters/mont`, {
          params: {monterId: currentMonter, dateEnd, dateStart},
        })
        .then((responce) => {
          setHomeList(responce.data);
          setArrAdress(Object.keys(responce.data.homes));
        });
    } catch (error) {
      // alert({ error });
      console.log(error)
    }
  }, [currentMonter, dateEnd, dateStart]);

  return (
    <div>
      {homeList !== null && arrAdress.length > 0 ? (
        <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
          {arrAdress
            .sort((a, b) => (a > b ? 1 : -1))
            .map((adress) => {
              const {home, entrances} = homeList?.homes[adress];

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
