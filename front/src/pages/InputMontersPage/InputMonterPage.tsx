import React from 'react';
import {ImportVisitMonterList} from "../../feature/ImportVisitMonterList";
import {MontersList} from "../../feature/MonterList";
import {ChoseCurrentMonters} from "../../feature/AddressList";
import AddressList from "../../feature/AddressList/ui/AddressList";


function InputMonterPage() {


  return (
    <div>
      <ImportVisitMonterList/>
      <MontersList/>
      <ChoseCurrentMonters/>
      <AddressList/>
    </div>
  );
}

export default InputMonterPage;
