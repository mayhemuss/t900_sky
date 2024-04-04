import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BACK_URL} from "../BACK_URL";
import VisitList from "./VisitList";

interface EntranceListProps {
  homeId: string | number
}

interface AllEntrance {
  id: string | number
  numberOfEntrance: string | number
}

function EntranceList({homeId}: EntranceListProps) {


  const [entrance, setEntrance] = useState<AllEntrance[] | null>(null);


  useEffect(() => {
    try {
      axios
        .get(`${BACK_URL}/api/entrance/entrance`, {params: {homeId}})
        .then(responce => setEntrance(responce.data))

    } catch (error) {
      alert({error});
    }


  }, []);


  return (
    <div style={{display: "flex", flexDirection: "column", gap:"15px"}}>
      {entrance !== null ? entrance.map(e => {
        return <div style={{display: "flex", flexDirection: "row", gap:"15px"}}
                    key={e.id}>
          <div style={{width:"15px"}}>{e.numberOfEntrance}</div>
          <VisitList entranceId={e.id}></VisitList>
        </div>
      }) : <></>}


    </div>
  );
}

export default EntranceList;
