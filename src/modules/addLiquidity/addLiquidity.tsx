import { IMAGES } from 'images';
import * as styled from './styles';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { getBusdToken, getBustToken, getBustValue } from 'utils/contract';
import { Contractaddress } from 'utils';
import { fromEther, toEther } from 'utils/helpers';
import Web3 from 'web3';
import busd from '../../utils/abis/busd.json';



function AddLiquidity() {
    const { account,library,active } = useWeb3React();
    const [busdBalance,setBusdBalance] = useState();
    const [input,setInput] = useState<any>({busd: "" , bust: ""});
    const [sendTransaction,setSendTransaction] = useState({approveBusd: false, approveBust:false}); 
    

    useEffect(()=>{
        const getBusdBalance = async () => {
            // const responce = await getBusdToken(library).methods.balanceOf(account).call();
            // const balance = library.utils.fromWei(responce, "ether");
            // setBusdBalance(balance);

            const web3 =  new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
            const instance = new web3.eth.Contract(busd["abi"] as any,Contractaddress.busdAddress);

            // const ethereum:any = await detectEthereumProvider();
           console.log(await web3.eth.getAccounts())

            const bal = await instance.methods.balanceOf("0x62F2a8B0B45826dD410ABB3ac6476E1c4B6d25aa").call();
            setBusdBalance(bal);
            console.log(bal,'bal--')
        }
        getBusdBalance();


    },[account,library])
 

    const changeInput  =  async (e:any) => {
        const {name , value} = e.target;
        if (name === "firstToken"){
            if(value !== ''){
            const getbusd = toEther(library,String(value));
            const responce = await getBustValue(library)
                                .methods.quote(getbusd,Contractaddress.reserveIn,Contractaddress.reserveOut).call();
            const bustvalue = fromEther(library,responce);
            setInput({
                ...value,
                busd:value,
                bust: bustvalue,
            });
        }
        else setInput({...value,busd:''});
        }

        else if (name === "secondToken"){
            if(value !== ''){
                const getbust = toEther(library,String(value));;
                const responce = 
                    await getBustValue(library)
                            .methods.quote(getbust,Contractaddress.reserveOut,Contractaddress.reserveIn).call();
                const busdvalue = fromEther(library,responce);
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

        setSendTransaction({...sendTransaction,approveBusd:true});
         await busdApprove();
        setSendTransaction({...sendTransaction,approveBust:true});
        await bustApprove();
        
        const busdMin = Number(input.busd) - ((Number(input.busd) / 100) * 0.05);
        const bustMin = Number(input.bust) - ((Number(input.busd) / 100) * 0.05);;
            
        const date = (Math.round(+new Date() / 1000) + 900).toString();

        await getBustValue(library).methods.addLiquidity(
            Contractaddress.busdAddress,
            Contractaddress.bustAddress,
            toEther(library,String(input.busd)),
            toEther(library,String(input.bust)),
            toEther(library,String(busdMin)),
            toEther(library,String(bustMin)),
             account,
             date
           ).send({
              from: account,
              gas: "2000000",
            }
        );
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
            <styled.HeaderText>Add Liquidity</styled.HeaderText>
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
                             sendTransaction.approveBust ? 'Approve Bust' : 'Add Liquidity'}
                    </styled.SwapButton>
                </form>
            </styled.InputContainer>
        </styled.ExchangeContainer>
    );
  }
  
  export default React.memo(AddLiquidity);