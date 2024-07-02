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
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1)
  const day = String(date.getDate())
  const initialdate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

  const [dateStart, setDateStart] = useState<string>("2000-01-01");
  const [dateEnd, setDateEnd] = useState<string>(initialdate);

  const [currentMonter, setCurrentMonter] = useState<number | string | null>(0);

  useEffect(() => {
    axios.get(`${BACK_URL}/api/monters`).then(responce => setMonters(responce.data))


  }, []);

  return (
    <div >

      <select onChange={(event) => setCurrentMonter(event.target.value)}>
        {currentMonter ? <></> : <option value={0}>выбери монтера</option>}
        {monters?.sort((a, b)=>a.name>b.name?1:-1).map(e => {
          return <option value={e.id} key={e.name}>{e.name}</option>
        })}
      </select>
      начало : <input value={dateStart} onChange={(event) => setDateStart(event.target.value)} type="date"/>
      конец : <input value={dateEnd} onChange={(event) => setDateEnd(event.target.value)} type="date"/>


      {currentMonter ? <AddressList currentMonter={currentMonter} dateStart={dateStart} dateEnd={dateEnd}/> : <></>}
    </div>
  );
}

export default MontersList;
