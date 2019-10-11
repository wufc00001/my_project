
const SET_CURRENT_MENU = 'SET_CURRENT_MENU'

export default (state = {}, action) => {  
    if(action.type == 'SET_CURRENT_MENU'){
        return {...state, menu_key: action.menu_key};
    }else{
        return state
    }
}

export const set_current_menu = (menu_key) => { 
    return { type: SET_CURRENT_MENU, menu_key }
}
