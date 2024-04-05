import React from 'react';
import {VisitType} from "../app/types/Types";


function OneVisit({visit}: { visit: VisitType }) {
  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <div style={{padding:"2px", justifyContent:"center", alignItems:"center", display:"flex", width: "100px", border: "1px solid black"}}>{visit.date}</div>
      <div style={{width: "250px", border: "1px solid black"}}>{visit.comments}</div>
      <div style={{backgroundColor:"lightgreen", justifyContent:"center", alignItems:"center", display:"flex", width: "50px", border: "1px solid black"}}>{visit.shieldsOk}</div>
      <div style={{justifyContent:"center", alignItems:"center", display:"flex", width: "50px", border: "1px solid black"}}>{visit.shieldsNew}</div>
      <div style={{justifyContent:"center", alignItems:"center", display:"flex", width: "50px", border: "1px solid black"}}>{visit.shieldsReNew}</div>
      <div style={{backgroundColor:"lightgreen", justifyContent:"center", alignItems:"center", display:"flex", width: "50px", border: "1px solid black"}}>{visit.mirrorOk}</div>
      <div style={{justifyContent:"center", alignItems:"center", display:"flex", width: "50px", border: "1px solid black"}}>{visit.mirrorNew}</div>
      <div style={{justifyContent:"center", alignItems:"center", display:"flex", width: "50px", border: "1px solid black"}}>{visit.mirrorReNew}</div>
      <div style={{backgroundColor:"lightblue", justifyContent:"center", alignItems:"center", display:"flex", width: "50px", border: "1px solid black"}}>{visit.stand}</div>
      <div style={{backgroundColor:"lightgreen",justifyContent:"center", alignItems:"center", display:"flex", width: "50px", border: "1px solid black"}}>{visit.a4}</div>
    </div>
  );
}

export default OneVisit;
