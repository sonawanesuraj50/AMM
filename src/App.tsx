import Header from "./components/header";
import AddLiquidity from "modules/addLiquidity";
import { useDispatch, useSelector } from "react-redux";
import { increment,decrement } from "logic/actions/actions";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "components/wallet-connect/injected";
import { WalletOptions } from "utils";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import RemoveLiquidity from "modules/removeLiquidity";
import Swap from "modules/swap";

function App() {

  const { activate } = useWeb3React();
  
  useEffect(()=>{
    const handleconnect = async () => {
      try{
          if(localStorage.getItem('walletConnected') === WalletOptions.metamask.toString())
          {          
            await activate(injected);
          }
          else if(localStorage.getItem('walletConnected') === WalletOptions.walletConnect.toString()){
            activate(walletconnect, undefined, true)
            .catch((error) => {
                if (error instanceof UserRejectedRequestError) {
                    activate(walletconnect);
                    localStorage.setItem('walletConnected',WalletOptions.walletConnect.toString());
                } else {
                    console.log('Pending Error Occured');
                    localStorage.clear();
                }
              }
            )
          }
      }catch{}
    }
    handleconnect();    
  },[activate])

  const state = useSelector((state:any) => state.count.counter);
  const dispatch = useDispatch();

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AddLiquidity />}/>
          <Route path="/removeLiquidity" element={<RemoveLiquidity />}/>
          <Route path="/swap" element={<Swap />}/>
        </Routes>
        <button onClick={()=>dispatch(increment(10))}>+</button>
          <div style={{color:'white'}}>{state}</div>
          <button onClick={()=>dispatch(decrement(10))}>-</button>
      </BrowserRouter>
    </>
  );
}

export default App;
