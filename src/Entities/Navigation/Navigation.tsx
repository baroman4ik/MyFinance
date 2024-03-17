import React from 'react';
import "./Navigation.css"
import {TonConnectButton} from "@tonconnect/ui-react";

const Navigation = () => (
  <nav>
    <a href="/#" className="nav-link">Счета</a>
    <a href="/#" className="nav-link">Аналитика</a>
    <a href="/#" className="nav-link">Операции</a>
    <a href="/#" className="nav-link">Настройки</a>
    <TonConnectButton/>
  </nav>
);

export default Navigation;