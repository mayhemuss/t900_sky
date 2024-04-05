import React from 'react';

import OneEntrance from "./OneEntrance";
import {oneHomesType} from "../app/types/Types";

function OneAdress({home, entrances}: oneHomesType) {
  const entranceArr = Object.keys(entrances)
  return (
    <div style={{display: "flex", flexDirection: "row", gap: "5px"}}>
      <div title={String( home.region)}
        style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100px",
        border: "1px solid black"
      }}>{home.region}</div>
      <div style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100px",
        border: "1px solid black"
      }}>{home.managerCompany}</div>
      <div title={home.address} style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "200px",
        border: "1px solid black"
      }}>{home.address}</div>
      <div title={String(home.numbOfFloors)}
        style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "50px",
        border: "1px solid black"
      }}>{home.numbOfFloors}</div>
      <div
        title={String(home.apartmentsCount)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "50px",
          border: "1px solid black"
        }}>{home.apartmentsCount}</div>
      <div style={{display: "flex", flexDirection: "column", gap: "3px"}}>
        {entranceArr.map(entrance => {
          const visits = entrances[entrance]
          return <OneEntrance key={visits[0].id} entrance={entrance} visits={visits}/>
        })}
      </div>
    </div>
  );
}

export default OneAdress;
