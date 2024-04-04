import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BACK_URL} from "../BACK_URL";

interface VisitListProps{
  entranceId: number | string
}
interface AllVisits{
  id:  number | string
  date: string
  comments: number | string
  shieldsOk: number | string
  shieldsNew: number | string
  shieldsReNew: number | string
  mirrorOk: number | string
  mirrorNew: number | string
  mirrorReNew: number | string
  stand: number | string
  a4: number | string
}

function VisitList({entranceId}:VisitListProps) {

  const [visit, setVisit] = useState<AllVisits[] | null>(null);

  useEffect(() => {
    try {
      axios
        .get(`${BACK_URL}/api/visit/visits`, {params: {entranceId}})
        .then(responce => setVisit(responce.data))

    } catch (error) {
      alert({error});
    }


  }, []);

  return (
    <div style={{display: "flex", flexDirection:"column", gap:"10px"}}>
      {visit !== null ? visit.sort((a,b) => a<b? 1: -1).map((item) => (
        <div style={{display:"flex", flexDirection:"row" , gap:"10px"}} key={item.id}>
          <div style={{width:"300px", border:"1px solid black"}}>{item.comments}</div>
          <div style={{width:"100px", border:"1px solid black"}}>{item.date}</div>
          <div style={{width:"20px", border:"1px solid black"}}>{item.shieldsOk}</div>
          <div style={{width:"20px", border:"1px solid black"}}>{item.shieldsNew}</div>
          <div style={{width:"20px", border:"1px solid black"}}>{item.shieldsReNew}</div>
          <div style={{width:"20px", border:"1px solid black"}}>{item.mirrorOk}</div>
          <div style={{width:"20px", border:"1px solid black"}}>{item.mirrorNew}</div>
          <div style={{width:"20px", border:"1px solid black"}}>{item.mirrorReNew}</div>
          <div style={{width:"20px", border:"1px solid black"}}>{item.stand}</div>
          <div style={{width:"20px", border:"1px solid black"}}>{item.a4}</div>
        </div>
      )): <></> }
    </div>
  );
}

export default VisitList;
