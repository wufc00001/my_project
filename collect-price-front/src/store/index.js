import { createStore, combineReducers } from 'redux';
import breadCrumb from '../reducer/breadCrumb'; 
import nickname from '../reducer/nickname'; 
import switchMenu from '../reducer/switchMenu'
import collapse from '../reducer/collapse'

const appReducer = combineReducers({
    breadCrumb,
    nickname,
    switchMenu,
    collapse 
});

const configStore = () => createStore(appReducer);

export default configStore;