import * as actions from '../actions/constants';

interface InitialState {
    counter: number;
}

const initialState:InitialState = {
    counter : 10,
}

const countReducer = (state=initialState,action:any):InitialState => {
    switch(action.type){

        case actions.INCREMENT_COUNTER:
            return {
                ...state, 
                counter: state.counter + action.payload
            };

        case actions.DECREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter - action.payload
            };

        default: return state;
    }
}

export default countReducer;