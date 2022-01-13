import axios from "axios";

export const getCoins = (page) => async (dispatch) =>{

    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets",{
        params: {
            vs_currency: "usd",
            page: page
        }
    });

    dispatch({type: 'GET_COINS', payload: response.data});

}
export const getFavs = (id) => async (dispatch) =>{

    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets",{
        params: {
            vs_currency: "usd",
            ids: id 
        }
    });

    dispatch({type: 'GET_FAVS', payload: response.data});

}

export const getCoinDetail = (id) => async (dispatch) =>{

    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets",{
        params: {
            vs_currency: "usd",
            ids: id 
        }
    });

    dispatch({type: 'GET_DETAIL', payload: response.data});

}
export const getChart = (id, days) => async (dispatch) =>{

    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`,{
        params: {
            vs_currency: "usd",
            days: days
        }
    });

    dispatch({type: 'GET_CHART', payload: response.data.prices});

}
export const addFav = (id) =>{
    return{
        type: "ADD_FAV",
        payload: id
    }
}

export const removeFav = (id) =>{
    return{
        type: "REMOVE_FAV",
        payload: id
    }
}

export const addCoin = (id) =>{
    return{
        type: "ADD_COIN",
        payload: id
    }
}