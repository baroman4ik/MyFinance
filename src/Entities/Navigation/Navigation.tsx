import React from 'react';
import "./Navigation.css"
import BurgerMenu from "../../Features/BurgerMenu/BurgerMenu";
import {Link} from "react-router-dom";

const Navigation = () => (
  <nav>
    <Link to="/" className="nav-link">Счета</Link>
    <Link to="/" className="nav-link">Аналитика</Link>
    <Link to="/" className="nav-link">Операции</Link>
    <Link to="/" className="nav-link">Настройки</Link>
    <BurgerMenu/>

    {/*<TonConnectButton/>*/}
  </nav>
);

export default Navigation;