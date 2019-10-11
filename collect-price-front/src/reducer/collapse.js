
const SET_COLLAPSE = 'SET_COLLAPSE'

export default (state = {}, action) => {   
    if(action.type == 'SET_COLLAPSE'){
        return {...state, collapse: action.collapsed};
    }else{
        return state
    }
}

export const set_collapse = (collapsed) => {
    return { type: SET_COLLAPSE, collapsed }
}
