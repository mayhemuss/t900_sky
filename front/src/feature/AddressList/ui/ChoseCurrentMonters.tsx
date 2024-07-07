import React, {ChangeEvent, FormEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMonterList, getMonterListisError, getMonterListisLoading} from "../../MonterList/selectors/MonterSelector";
import {AddressesActions} from "../slice/AddressesSlice";
import {
  getAddressesCount,
  getAddressLimit,
  getAddressPage, getarrPageCount,
  getCurrentMonter,
  getDateEnd,
  getDateStart
} from "../selectors/AddressSelector";
import {getAllAddress} from "../services/getAllAddresses";

function ChoseCurrentMonters() {
  const dispatch = useDispatch()
  const monters = useSelector(getMonterList)
  const monterIsLoading = useSelector(getMonterListisLoading)
  const montersError = useSelector(getMonterListisError)
  const limit = useSelector(getAddressLimit)
  const page = useSelector(getAddressPage)
  const dateStart = useSelector(getDateStart)
  const dateEnd = useSelector(getDateEnd)
  const currentMonter = useSelector(getCurrentMonter)
  const pageCount = useSelector(getAddressesCount)
  const arrPageCount = useSelector(getarrPageCount)

  const currentMonterHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(AddressesActions.setCurrentMonter(+event.currentTarget.value))
    dispatch(AddressesActions.setPage(0))
  }

  const dateStartHandler = ((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(AddressesActions.setDateStart(event.target.value))
  })

  const dateEndHandler = ((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(AddressesActions.setDateEnd(event.target.value))
  })

  const limitHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(AddressesActions.setPage(0))
    dispatch(AddressesActions.setLimit(+event.target.value))
    getMontersHomes({currentMonter, dateEnd, dateStart, page:0, limit: +event.target.value})
  }

  // @ts-ignore
  const getMontersHomes = ({currentMonter, dateEnd, dateStart, page, limit}) => {
    // @ts-ignore
    dispatch(getAllAddress({currentMonter, dateEnd, dateStart, page, limit}))
  }

  const submitHandler = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    getMontersHomes({currentMonter, dateEnd, dateStart, page, limit})
  }




  return (
    <div>
      <form>
        <select onChange={currentMonterHandler}>
          {monters ? <>
            <option value={0}>выбери монтера</option>
          </> : <></>}
          {!monterIsLoading && !montersError ? monters?.map(e => {
            return <option value={e.id} key={e.name}>{e.name}</option>
          }) : <></>}

        </select>
        начало : <input value={dateStart} onChange={dateStartHandler} type="date"/>
        конец : <input value={dateEnd} onChange={dateEndHandler} type="date"/>
        <button onClick={submitHandler}>загрузить
        </button>

      </form>

      <select onChange={limitHandler}>
        {[5, 10, 15, 20, 25].map((number) => {
          return <option value={number} key={number}>
            {number}
          </option>
        })}

      </select>
      {arrPageCount.map((pages) => {
        return <button
          style={{backgroundColor: pages.value == page ? "lightblue" : "gray"}}
          onClick={() => {
            dispatch(AddressesActions.setPage(pages.value))
            // @ts-ignore
            getMontersHomes({currentMonter, dateEnd, dateStart, page:pages.value, limit})
          }}
          value={pages.value}
          key={pages.value}
        >{pages.numberChild}
        </button>
      })}
    </div>
  );
}

export default ChoseCurrentMonters;
