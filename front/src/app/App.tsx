import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMonter} from "../store/selectors/MonterSelectors";
import {getAllMonter} from "../store/asyncThunc/getAllMonter";
import {TVisits} from "./types/TVisits";
import axios from "axios";
import {MonterActions} from "../store/slice/monterSlice";



function App() {
  const [visits, setVisits] = useState<TVisits[]>([{address: "", name: "", numberOfEntrance: ""}])

  const dispatch = useDispatch()
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setVisits(JSON.parse(e.target.value))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // @ts-ignore
      dispatch(getAllMonter())

  }, []);

  const clickHandler = (event:ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    dispatch(MonterActions.setCurrentMonter(event.target.value))

  }

  async function formHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await axios.post("http://192.168.0.101:5000/api/home", {a: JSON.stringify(visits)})
      console.log(await response)
    } catch (error) {
      console.log({message: error});
    }
    const response = await axios.post("http://192.168.0.101:5000/api/home", {a: JSON.stringify(visits)})
    console.log(await response)

  }


  const {currentMonter, monterList} = useSelector(getMonter)

  return (
    <div className="App">
      <>
        <form
          onSubmit={formHandler}
          // onSubmit={(e)=>{}}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px"
          }}>
          <label>введи данные из экселя </label>
          <input onChange={inputHandler}></input>
          <button type="submit">загрузить</button>
        </form>
      </>


      <>
        <select onChange={clickHandler}>
          <option value={""}>не выбрано</option>
          {monterList ? monterList.map(elem => {
            return <option value={elem} key={elem}>{elem}</option>
          }) : <option>123</option>}

        </select>
      </>




    </div>
  );
}

export default App;
