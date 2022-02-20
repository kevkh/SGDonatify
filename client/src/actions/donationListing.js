import { FETCH_ALL_DONATION } from '../constants/actionTypes';
import * as api from '../api'; 

export const getDonation =  () => async(dispatch) => {
    try{
        const {data}  = await api.getDonationListings();
        dispatch({type:FETCH_ALL_DONATION, payload:data})
    }catch(error){
        console.log(error.message);

    }

}