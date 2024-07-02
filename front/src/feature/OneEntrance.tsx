import React from 'react';

import OneVisit from "./OneVisit";
import {VisitType} from "../app/types/Types";


function OneEntrance({visits, entrance}: { visits: VisitType[], entrance: string }) {

  return <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
    <div style={{display: "flex", flexDirection: "row", gap: "5px", border:"2px solid black"}}>
      <div
        title={entrance}
        style={{
        width: "50px",
        border: "1px solid black",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}>{entrance}</div>
      <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
        {visits.map((visit , index) => {

          return <OneVisit index={index} key={visit.id} visit={visit}/>
        })}
      </div>
    </div>

  </div>
}

export default OneEntrance;
