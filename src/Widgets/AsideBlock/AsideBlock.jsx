import React from 'react';
import Accounts from "../Accounts/Accounts";
import Calculate from "../Calculate/Calculate";
import "./AsideBlock.css"

function AsideBlock({isMobile = false}) {
  return (
    <aside className={`${isMobile && "mobile"}`}>
      <Accounts className={`${isMobile && "mobile"}`}/>

      <div className='aside-block'>
        <Calculate/>

      </div>
    </aside>
  );
}

export default AsideBlock;