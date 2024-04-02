import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";


function InputMonterPage() {

  const [inputFile, setInputFile] = useState< File | null >(null);
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {

    // @ts-ignore
    setInputFile(event.target.files[0])
    // console.log(event.target.value)
  }

  async function formHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = inputFile?.name
    console.log(name)
    const formData = new FormData();

    // @ts-ignore
    formData.append('file',  inputFile);

    try {
      const response = await axios.post("http://192.168.0.101:5000/api/monter/create", formData)
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

export default InputMonterPage;
