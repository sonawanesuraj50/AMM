import busd from './abis/busd.json';
import bust from './abis/bust.json';
import bustLp from './abis/bustLp.json';
import getammountAbi from './abis/getammountAbi.json';
import { Contractaddress } from './constants';



export const getBusdToken = (library:any) => {
    return new library.eth.Contract(busd["abi"],Contractaddress.busdAddress);
}

export const getBustToken = (library:any) => {
    return new library.eth.Contract(bust["abi"],Contractaddress.bustAddress);
}

export const getBustValue = (library:any) => {
    return new library.eth.Contract(getammountAbi["abi"],Contractaddress.getAmmountContract);
}

export const getBustLp = (library:any) => {
    return new library.eth.Contract(bustLp["abi"],Contractaddress.bustLpContract);
}