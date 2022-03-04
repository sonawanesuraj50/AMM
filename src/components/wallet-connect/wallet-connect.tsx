import { IMAGES } from "images";
import { useState } from "react";
import * as Styled from "./style";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "./injected";
import { WalletOptions } from "utils";
import { UserRejectedRequestError } from '@web3-react/walletconnect-connector';
import { useDispatch } from "react-redux";
import { modalClose } from "logic/actions/modal.actions";

function WalletConnect()  {
    const [actived,setActived] = useState(WalletOptions.default);
    const [checked,setChecked] = useState(false);

    const { activate } = useWeb3React();

    const dispatch = useDispatch();


    async function connect() {
        console.log('wallet connect ---',actived)
        if(actived === WalletOptions.metamask){
            try {
                await activate(injected);
                localStorage.setItem('walletConnected',WalletOptions.metamask.toString());
                dispatch(modalClose)
            } catch (ex) {
                console.log(ex);
            }
        }
        else if(actived === WalletOptions.walletConnect){
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
    }

  return (
    <Styled.WalletContainer>
        <Styled.WalletHeaderText>
            Connect Wallet
        </Styled.WalletHeaderText>
        <Styled.WalletSubText>
            Choose Wallet
        </Styled.WalletSubText>
        <Styled.WalletIconContainer>
            <Styled.WalletIcon  onClick={()=>setActived(WalletOptions.metamask)} active={actived === WalletOptions.metamask}>
                <img src={IMAGES.metamaskLogo.default} alt="default" />
                metamask
            </Styled.WalletIcon>
            <Styled.WalletIcon  onClick={()=>setActived(WalletOptions.walletConnect)} active={actived === WalletOptions.walletConnect}>
                <img src={IMAGES.walletConnectLogo.default} alt="default" />
                Wallet Connect
            </Styled.WalletIcon>
        </Styled.WalletIconContainer>
        <Styled.ConnetcConditions>
            <input 
                type="checkbox"
                onChange={()=>setChecked(!checked)}
            />
            Terms And Conditions
        </Styled.ConnetcConditions>
        <Styled.ConnetcButton disabled={!checked} onClick={connect}>
            Connect
        </Styled.ConnetcButton>
    </Styled.WalletContainer>
  );
};

export default WalletConnect;