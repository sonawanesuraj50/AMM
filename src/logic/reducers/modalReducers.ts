import * as actions from '../actions/constants';

interface InitialState {
    modalState : boolean
}

const initialState:InitialState = {
    modalState : false
}

export const ModalStatus = (state = initialState,action:any) => {
    switch(action.type){
        case actions.MODALOPEN:
            return{
                modalState : !state.modalState
            }
        case actions.ModalClose:
            return{
                modalstate : !state.modalState
            }
        default: return state
    }
}