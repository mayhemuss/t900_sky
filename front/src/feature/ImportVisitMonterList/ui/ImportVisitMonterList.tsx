import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";
import {BACK_URL} from "../../../BACK_URL";

function ImportVisitMonterList() {

  const [inputFile, setInputFile] = useState< File | null >(null);
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {

    // @ts-ignore
    setInputFile(event.target.files[0])

  }

  async function formHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = inputFile?.name
    console.log(name)
    const formData = new FormData();

    // @ts-ignore
    formData.append('file',  inputFile);

    try {
      const response = await axios.post(`${BACK_URL}/api/visits/addAll`, formData)
      console.log(await response)
    } catch (error) {
      console.log({message: error});
    }


  }

  return (
    <div>
      <form onSubmit={formHandler}>
        файл json из отчета:
        <input
          type="file"
          onChange={inputHandler}
        />
        <button type="submit">
          Сохранить и закрыть
        </button>

      </form>
    </div>
  );
}

export default ImportVisitMonterList;
