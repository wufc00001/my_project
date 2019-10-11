
const SET_BREAD_NAME = 'SET_BREAD_CRUMB'

export default (state = {}, action) => {  
    if(action.type == 'SET_BREAD_CRUMB'){
        return {...state, bread_crumb: action.bread_crumb};
    }else{
        return state
    }
}

export const set_bread_crumb = (bread_crumb) => {
    return { type: SET_BREAD_NAME, bread_crumb }
}
