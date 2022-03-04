import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './logic/store';
import { Provider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from 'web3';
import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(44, 47, 54);
  }
`;

function getLibrary(provider:any){
  return new Web3(provider);
}


ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <React.StrictMode>
        <GlobalStyle />
        <App />
      </React.StrictMode>
    </Provider>
  </Web3ReactProvider>,
  document.getElementById('root')
);
