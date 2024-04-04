import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BACK_URL} from "../BACK_URL";
import AddressList from "./AddressList";

interface AllMonters {
  id: string | number
  name: string
  createdAt: string
  updateAt: string
}

function MontersList() {

  const [monters, setMonters] = useState<AllMonters[] | null>();


  const [currentMonter, setCurrentMonter] = useState<number|string | null>(0);

  useEffect(() => {
     axios.get(`${BACK_URL}/api/monters`).then(responce=>  setMonters(responce.data))

  }, []);

  return (
    <div>

      <select onChange={(event)=>setCurrentMonter(event.target.value)}>
        {currentMonter?<></> : <option value={0}>выбери монтера</option>}
      {monters?.map(e=> {
        return <option value={e.id} key={e.name}>{e.name}</option>
      })}
      </select>
      {currentMonter?<AddressList currentMonter={currentMonter}/>:<></>}
    </div>
  );
}

export default MontersList;
