import React from 'react';
import "./BurgerMenu.css"
import AsideBlock from "../../Widgets/AsideBlock/AsideBlock";
import Hamburger from 'hamburger-react'

function BurgerMenu() {
  const [isOpen, setOpen] = React.useState(false);

  const links = [
    ["Главная", "/main"],
    ,
    ["Анализ", "/analysis"],
    ["Счета", "/accounts"],
    ["Отчёты", "/report"],
  ];

  return (
    <div className="MenuToggle">
      <Hamburger toggled={isOpen} toggle={setOpen}/>
      <ul className={isOpen ? "open" : null}>
        {/*{links.map(([name, link]) => (*/}
        {/*  <Link to={link}>*/}
        {/*    <li>{name}</li>*/}
        {/*  </Link>*/}
        {/*))}*/}
        <AsideBlock isMobile={true}/>

      </ul>
    </div>
  );
}

export default BurgerMenu;