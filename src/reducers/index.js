import { combineReducers } from 'redux';

const coins = (state=[], action) =>{
    if(action.type==='GET_COINS'){
        return action.payload;
    }
    return state;
}

const chart = (state=[], action) =>{
    if(action.type==='GET_CHART'){
        return action.payload;
    }
    return state;
}


const listFav = (state=[], action) =>{
    if(action.type==='GET_FAVS'){
        return [...state, action.payload];
    }
    if(action.type ==='REMOVE_FAV'){
        return state.filter(item => item[0].id !== action.payload);
    }
    return state;
}

const coinDetail = (state=[], action) =>{
    if(action.type==='GET_DETAIL'){
        return action.payload;
    }
    return state;
}

const favorites = (state=[], action) =>{
    switch (action.type) {
        case 'ADD_FAV':
            return[...state, action.payload];
        case 'REMOVE_FAV':
            return state.filter(item=>item !== action.payload);
        default:
            return state;
    }
}

const selectCoin = (state='', action)=>{
    if(action.type==='ADD_COIN'){
        return action.payload;
    }
    return state;
}


export default combineReducers(
    {
        coins: coins,
        chart: chart,
        selectCoin: selectCoin,
        coinDetail: coinDetail,
        favorites: favorites,
        listFav: listFav,
    }
);