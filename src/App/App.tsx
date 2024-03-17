import React from 'react';
import {DatesProvider} from "@mantine/dates";
import 'dayjs/locale/ru';
import {MantineProvider} from '@mantine/core';
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import {Route, Routes,} from "react-router-dom";
import {Analytics} from "../Pages/Analytics";
import {Operations} from "../Pages/Operations";
import {MainPanel} from "../Pages/MainPanel";
import Navigation from "../Entities/Navigation/Navigation";


function App() {


  return (
    <MantineProvider>
      <DatesProvider settings={{locale: 'ru'}}>
        <TonConnectUIProvider manifestUrl="https://127.0.0.1:3000/tonconnect-manifest.json">
          {/*<Navigation/>*/}
          <Routes>
            <Route path="/" element={<MainPanel/>}>
              <Route index element={<Navigation/>}/>
              {/*<Route index element={<SneakerGrid/>}/>*/}
              <Route path="/operations" element={<Operations/>}/>
              <Route path="/analytics" element={<Analytics/>}/>
              <Route path="*" element={<MainPanel/>}/>
            </Route>
          </Routes>
        </TonConnectUIProvider>

      </DatesProvider>
    </MantineProvider>

  );
}

export default App;
