import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BACK_URL} from "../BACK_URL";
import EntranceList from "./EntranceList";

interface AdressListProps {
  /** The text to display inside the button */
  currentMonter: string | number;

}

interface AllHome {
  id: string | number
  address: string
  region: string
  numbOfFloors: string
  apartmentsCount: string
  createdAt: string
  updateAt: string
}

function AddressList({currentMonter}: AdressListProps) {


  const [home, setHome] = useState<AllHome[] | null>(null);
  useEffect(() => {
    try {
      axios
        .get(`${BACK_URL}/api/home/home`, {params: {monterId: currentMonter}})
        .then(responce => setHome(responce.data))

    } catch (error) {
      alert({error});
    }


  }, [currentMonter]);

  return (    <div>
      {home !== null ? home.slice(0,10).map(e=>{return <div style={{display:"flex", flexDirection:"row", gap:"15px"}} key={e.address}>
        <div style={{width:"150px"}}>{e.region}</div>
        <div style={{width:"200px"}}>{e.address}</div>
        <div style={{width:"20px"}}>{e.numbOfFloors}</div>
        <div style={{width:"20px"}}>{e.apartmentsCount}</div>
        <EntranceList homeId={e.id}/>
      </div> }):<></>}

    </div>

  );

  // return ( <div>    {home !== null ? home.map(e => {
  // return (<div key={e.address}>
  //   <div>{e.address}</div>
  //   <div>{e.numbOfFloors}</div>
  //   <div></div>
  //   <div>) })
  //     : <></>}
  //
  //   </div>
  //   );
}
  export default AddressList;
