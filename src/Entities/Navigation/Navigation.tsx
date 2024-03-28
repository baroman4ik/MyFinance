import React from 'react';
import "./Navigation.css"
import BurgerMenu from "../../Features/BurgerMenu/BurgerMenu";

const Navigation = () => (
  <nav>
    <a href="/#" className="nav-link">Счета</a>
    <a href="/#" className="nav-link">Аналитика</a>
    <a href="/#" className="nav-link">Операции</a>
    <a href="/#" className="nav-link">Настройки</a>
    <BurgerMenu/>

    {/*<TonConnectButton/>*/}
  </nav>
);

export default Navigation;