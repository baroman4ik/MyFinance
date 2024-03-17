import React from 'react';
import {TransactionsList} from "../../Features/TransactionsList";
import Calculate from "../../Widgets/Calculate/Calculate";

const Operations = () => {
  return (
    <div className="operations">
      <h3>Операции на счету</h3>

      <TransactionsList/>
      <Calculate/>
    </div>
  );
};


export default Operations;