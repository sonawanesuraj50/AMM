import { IMAGES } from 'images';
import * as styled from './styles';
import { useWeb3React } from '@web3-react/core';
import React, { useCallback, useEffect, useState } from 'react';
import { getBustLp, getBustValue } from 'utils/contract';
import { Contractaddress } from 'utils';
import { fromEther, toEther } from 'utils/helpers';

interface Input {
    busd: String,
    bust: String
}

function RemoveLiquidity() {
    const { account,library,active } = useWeb3React();
    const [busdLpBalance,setBusdLpBalance] = useState();
    const [input,setInput] = useState<Input>({busd: "0.0" , bust: "0.0"});
    const [sendTransaction,setSendTransaction] = useState({approveBusd: false,approveBust:false});  
    const [percentages,setPercentages] = useState(0);

    const getBusdLp = useCallback( async () => {
        const responce = await getBustLp(library).methods.balanceOf(account).call();
        const balance = library.utils.fromWei(responce, "ether");
        setBusdLpBalance(balance);
    },[account,library]);

    useEffect(()=>{
            active && getBusdLp()
    },[account,library,active,busdLpBalance,getBusdLp]);

    const busdLpApprove = async () => {
        return await getBustLp(library).methods
                .approve(Contractaddress.getAmmountContract,toEther(library,'50')).send({from: account});
    }
    
    const handleSubmit = async () => {
        setSendTransaction({...sendTransaction,approveBusd:true});

         await busdLpApprove();
        
        const busdMin = Number(input.busd) - ((Number(input.busd) / 100) * 0.05);
        const bustMin = Number(input.bust) - ((Number(input.busd) / 100) * 0.05);
            
        const date = (Math.round(+new Date() / 1000) + 900).toString();

        const busdLpBalance = await getBustLp(library).methods.balanceOf(account).call();

        const busdLp = busdLpBalance -  (busdLpBalance * percentages);

        const responce = await getBustValue(library).methods.removeLiquidity(
            Contractaddress.busdAddress,
            Contractaddress.bustAddress,
            String(busdLp),
            toEther(library,String(busdMin)),
            toEther(library,String(bustMin)),
            account,
            date
           ).send({
              from: account,
              gas: "3000000",
            }
        );

        getBusdLp(); 
        alert(`Successful`);      
        console.log(responce)
    } 


    const handleMax = async (percentage: any) => {
        setPercentages(percentage);

        const reserve = await getBustLp(library).methods.getReserves().call();
        const totalSupply = await getBustLp(library).methods.totalSupply().call();
        const busdLpBalance = await getBustLp(library).methods.balanceOf(account).call();

        const busdLp = busdLpBalance -  (busdLpBalance * percentage);

        const busdbalance = (reserve[0] / totalSupply) * busdLp;
        const bustbalance = (reserve[1] / totalSupply) * busdLp;     
        
        const busd = fromEther(library,String(busdbalance));
        const bust = fromEther(library,String(bustbalance));

        setInput({ busd: busd,bust: bust });
    }

  
    return (
        <styled.ExchangeContainer>
            <styled.HeaderText>Remove Liquidity</styled.HeaderText>
            <styled.InputContainer>
                <styled.ButtonContainer>
                    <styled.Maxbutton type="button" onClick={()=>handleMax(0.75)}>
                        25%
                    </styled.Maxbutton>                    
                    <styled.Maxbutton type="button" onClick={()=>handleMax(0.5)}>
                        50%
                    </styled.Maxbutton>
                    <styled.Maxbutton type="button" onClick={()=>handleMax(0.25)}>
                        75%
                    </styled.Maxbutton>
                    <styled.Maxbutton type="button" onClick={()=>handleMax(0)}>
                        Max
                    </styled.Maxbutton>
                </styled.ButtonContainer>
                <styled.SwapContainer>
                    <styled.InputTextContainer>
                    <styled.InputText>
                        From
                    </styled.InputText>
                    <styled.InputText>
                        BustLp:- {!!busdLpBalance ? Number(busdLpBalance).toFixed(2) : 0}
                    </styled.InputText>
                </styled.InputTextContainer>
                <styled.TokenContainer>
                    <div>{input.busd}</div>
                    <label>BUSD</label>
                </styled.TokenContainer>
                </styled.SwapContainer>
                <styled.DownArrow src={IMAGES.downArrow.default} alt="arrow" />
                <styled.SwapContainer>
                    <styled.InputTextContainer>
                    <styled.InputText>
                        To
                    </styled.InputText>
                </styled.InputTextContainer>
                <styled.TokenContainer>
                    <div>{input.bust}</div>
                    <label>BUST</label>
                </styled.TokenContainer>
                </styled.SwapContainer>
                <styled.SwapButton onClick={handleSubmit}>
                    {sendTransaction.approveBusd ? 
                        'Approve Busd' : sendTransaction.approveBust ? 'Approve Bust' : 'Remove'}
                </styled.SwapButton>
            </styled.InputContainer>
        </styled.ExchangeContainer>
    );
  }
  
  export default React.memo(RemoveLiquidity);