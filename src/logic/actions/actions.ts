import * as actions from "./constants";

export const increment = (count:number) => {
    return(dispatch:any)=>{
        dispatch({
            type: actions.INCREMENT_COUNTER,
            payload: count,
        })
    }
}


export const decrement = (count:number) => {
    return(dispatch:any)=>{
        dispatch({
            type: actions.DECREMENT_COUNTER,
            payload: count,
        })
    }
}
