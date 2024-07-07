import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
// import {getCurrentMonter, getDateEnd, getDateStart} from "./selectors/MonterSelector";
import {getAllMontersList} from "../services/getAllMontersList";
import {getMonterList, getMonterListisError, getMonterListisLoading} from "../selectors/MonterSelector";


function MontersList() {
  const dispatch = useDispatch()
  const monters = useSelector(getMonterList)
  const monterIsLoading = useSelector(getMonterListisLoading)
  const montersError = useSelector(getMonterListisError)

  // const [monters, setMonters] = useState<AllMontersList[] | null>();

  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(0)

  // const dateStart = useSelector(getDateStart)
  // const dateEnd = useSelector(getDateEnd)
  // const currentMonter = useSelector(getCurrentMonter)
  //
  const [currentMonter, setCurrentMonter] = useState(undefined)

  const currentMonterHandler = (event: ChangeEvent<HTMLSelectElement>) => {

    // @ts-ignore
    setCurrentMonter(event.currentTarget.value)
  }
  //
  // const dateStartHandler = ((event: ChangeEvent<HTMLInputElement>) => {
  //   dispatch(MonterActions.setDateStart(event.target.value))
  // })
  // const dateEndHandler = ((event: ChangeEvent<HTMLInputElement>) => {
  //   dispatch(MonterActions.setDateEnd(event.target.value))
  // })

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllMontersList("ss"))


  }, []);

  return (

    <></>
  );
}

export default MontersList;
