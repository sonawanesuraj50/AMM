import CustomModal from "../custom-modal";
import * as Styled from "./styles";
import WalletConnect from "components/wallet-connect";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { modalClose, modalOpen } from "logic/actions/modal.actions";

function Header() {
    const { account, deactivate } = useWeb3React();

    const dispatch = useDispatch();
    const modal = useSelector((state:any) => state.modal.modalState);

    console.log(modal)

    const handleModalClose = () => {
      dispatch(modalClose);
    };

    async function disconnect() {
      try {
        deactivate();
        localStorage.clear();
      } catch (ex) {
        console.log(ex)
      }
    }

  return (
    <Styled.HeaderContainer>
        <Styled.HeaderText>
            React
        </Styled.HeaderText>

        <Styled.MenuOptions to="/">
            Add Liquidity
        </Styled.MenuOptions>

        <Styled.MenuOptions to="/removeLiquidity">
            Remove Liquidity
        </Styled.MenuOptions>

        <Styled.MenuOptions to="/swap">
            Swap
        </Styled.MenuOptions>

        <Styled.AccountAddress>
          Address:- {!!account ? `${String(account).slice(0,5)}...${String(account).slice(-4)}` : 0}
        </Styled.AccountAddress>
        {!!account ?      
          <Styled.ConnectButton onClick={disconnect}>
            Dissconnect     
          </Styled.ConnectButton>
          :
          <Styled.ConnectButton onClick={()=>dispatch(modalOpen)}>
            Connect a wallet           
          </Styled.ConnectButton>
        }
        <CustomModal show={modal} handleClose={handleModalClose}>
           <WalletConnect />
        </CustomModal>
    </Styled.HeaderContainer>
  );
}

export default Header;
