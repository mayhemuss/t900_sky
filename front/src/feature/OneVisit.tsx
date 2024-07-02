import React from 'react';
import {VisitType} from "../app/types/Types";


function OneVisit({visit, index}: { visit: VisitType, index: number }) {
  const currentdate = new Date(visit.date)
  const today = new Date()

  // console.log(String(new Date(visit.date) - new Date()))
  // @ts-ignore
 const olol= String(Math. floor((today - currentdate) / 86400000))
  const color = +olol > 50 ? "red": "white"
  return (
    <div style={{display: "flex", flexDirection: "row"}}>

      {index == 0?
        <div style={{

          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "50px",
          border: "1px solid black",
backgroundColor: color
        }}>{olol}</div>
        : <div style={{

        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "50px",
        border: "1px solid black"

      }}>{olol}</div>}



      <div style={{
        padding: "2px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100px",
        border: "1px solid black"

      }}
      >{visit.date}</div>
      <div style={{width: "250px", border: "1px solid black"}}>{visit.comments}</div>
      <div style={{
        backgroundColor: "lightgreen",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "50px",
        border: "1px solid black"
      }}>{visit.shieldsOk}</div>
      <div style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "50px",
        border: "1px solid black"
      }}>{visit.shieldsNew}</div>
      <div style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "50px",
        border: "1px solid black"
      }}>{visit.shieldsReNew}</div>
      <div style={{
        backgroundColor: "lightgreen",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "50px",
        border: "1px solid black"
      }}>{visit.mirrorOk}</div>
      <div style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "50px",
        border: "1px solid black"
      }}>{visit.mirrorNew}</div>
      <div style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "50px",
        border: "1px solid black"
      }}>{visit.mirrorReNew}</div>
      <div style={{
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "50px",
        border: "1px solid black"
      }}>{visit.stand}</div>
      <div style={{
        backgroundColor: "lightgreen",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "50px",
        border: "1px solid black"
      }}>{visit.a4}</div>
    </div>
  );
}

export default OneVisit;

