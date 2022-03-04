import { IMAGES } from 'images';
import * as styled from './styles';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { getBusdToken, getBustToken, getBustValue } from 'utils/contract';
import { Contractaddress } from 'utils';
import { fromEther, toEther } from 'utils/helpers';


function Swap() {
    const { account,library,active } = useWeb3React();
    const [busdBalance,setBusdBalance] = useState();
    const [input,setInput] = useState<any>({busd: "" , bust: ""});
    const [sendTransaction,setSendTransaction] = useState({ approveBusd: false, approveBust:false }); 
    const [swapToken,setSwapToken] = useState(false);


    useEffect(()=>{
        const getBusdBalance = async () => {
            const responce = await getBusdToken(library).methods.balanceOf(account).call();
            const balance = library.utils.fromWei(responce, "ether");
            setBusdBalance(balance);
        }
        active && getBusdBalance();
    },[account,library,active])
 

    const changeInput  =  async (e:any) => {
        const {name , value} = e.target;
        if (name === "firstToken"){
            setSwapToken(false);
            if(value !== ''){
            const getbusd = toEther(library,String(value));
            const responce = await getBustValue(library)
                                .methods.getAmountsOut(getbusd,[Contractaddress.busdAddress,Contractaddress.bustAddress]).call();
            const bustvalue = fromEther(library,responce[1]);
            setInput({
                ...value,
                busd:value,
                bust: bustvalue,
            });
        }
        else setInput({...value,busd:''});
        }

        else if (name === "secondToken"){
            setSwapToken(true);
            if(value !== ''){
                const getbust = toEther(library,String(value));

                const responce = 
                    await getBustValue(library)
                            .methods.getAmountsIn(getbust,[Contractaddress.busdAddress,Contractaddress.bustAddress]).call();
                const busdvalue = fromEther(library,responce[0]);
                setInput({
                    ...value,
                    busd: busdvalue,
                    bust: value,
                });
            }
            else setInput({...value,bust:''});
        }
    }

    const busdApprove = async () => {
        return await getBusdToken(library).methods
            .approve(Contractaddress.getAmmountContract,toEther(library,'555')).send({from: account});
    }

    const bustApprove = async () => {
        return await getBustToken(library).methods
            .approve(Contractaddress.getAmmountContract,toEther(library,'555')).send({from: account});
    }
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();

        // setSendTransaction({...sendTransaction,approveBusd:true});
        //  await busdApprove();
        // setSendTransaction({...sendTransaction,approveBust:true});
        // await bustApprove();
            
        const date = (Math.round(+new Date() / 1000) + 900).toString();

        if(swapToken === true){
            console.log('second Input');
            await getBustValue(library).methods.swapTokensForExactTokens(
                toEther(library,input.bust),
                toEther(library,input.busd),
                [Contractaddress.busdAddress,Contractaddress.bustAddress],
                 account,
                 date
               ).send({
                  from: account,
                  gas: "2000000",
                }
            );

            console.log(
                toEther(library,input.bust),
                toEther(library,input.busd),
                [Contractaddress.busdAddress,Contractaddress.bustAddress],
                account,
                date)
        }
        else{
            console.log('first Input');
            await getBustValue(library).methods.swapExactTokensForTokens(
                toEther(library,input.busd),
                toEther(library,input.bust),
                [Contractaddress.busdAddress,Contractaddress.bustAddress],
                 account,
                 date
               ).send({
                  from: account,
                  gas: "2000000",
                }
            );

        }
    } 

    const handleMax = async () => {
        const getbusd = toEther(library,String(busdBalance));
        const responce = await getBustValue(library)
            .methods.quote(getbusd,Contractaddress.reserveIn,Contractaddress.reserveOut).call();
        const bustvalue = fromEther(library,responce);
        setInput({busd:busdBalance,bust:bustvalue})
    }

  
    return (
        <styled.ExchangeContainer>
            <styled.HeaderText>Swap</styled.HeaderText>
            <styled.InputContainer>
                <form onSubmit={handleSubmit}>
                    <styled.SwapContainer>
                        <styled.InputTextContainer>
                        <styled.InputText>
                            From
                        </styled.InputText>
                        <styled.InputText>
                            Balance:- {!!busdBalance ? Number(busdBalance).toFixed(2) : 0}
                        </styled.InputText>
                    </styled.InputTextContainer>
                    <styled.TokenContainer>
                        <input 
                            id='firstToken' 
                            name='firstToken' 
                            placeholder='0.0' 
                            value={input.busd}
                            onChange={changeInput}
                        />
                        <styled.Maxbutton type="button" onClick={handleMax}>
                            Max
                        </styled.Maxbutton>
                        <select name="firstSecondToken">
                            <option value="BNB">BUSD</option>
                            <option value="USDT">USDT</option>
                        </select>
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
                        <input 
                            id='secondToken' 
                            name='secondToken' 
                            placeholder='0.0'
                            value={input.bust}
                            onChange={changeInput}
                        />
                        <select name="selectSecondToken">
                            <option value="BNB">BUSt</option>
                            <option value="USDT">USDT</option>
                        </select>
                    </styled.TokenContainer>
                    </styled.SwapContainer>
                    <styled.SwapButton type="submit">
                        {sendTransaction.approveBusd ? 'Approve Busd' : 
                             sendTransaction.approveBust ? 'Approve Bust' : 'Swap'}
                    </styled.SwapButton>
                </form>
            </styled.InputContainer>
        </styled.ExchangeContainer>
    );
  }
  
  export default React.memo(Swap);