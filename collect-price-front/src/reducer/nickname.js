
const SET_NICKNAME = 'SET_NICKNAME'

export default (state = {}, action) => {  
    if(action.type == 'SET_NICKNAME'){
        return {...state, nickname: action.nickname};
    }else{
        return state
    }
}

export const set_nickname = (nickname) => {
    return { type: SET_NICKNAME, nickname }
}