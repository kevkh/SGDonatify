import { FETCH_ALL_DONATION,UPDATE_DONATION_VALUE } from '../constants/actionTypes';
import * as api from '../api'; 

export const getDonation =  () => async(dispatch) => {
    try{
        const {data}  = await api.getDonationListings();
        dispatch({type:FETCH_ALL_DONATION, payload:data})
    }catch(error){
        console.log(error.message);

    }


}

export const getAllDonation =  () => async(dispatch) => {
    try{
        const {data}  = await api.getAllDonationListings();
        dispatch({type:FETCH_ALL_DONATION, payload:data})
    }catch(error){
        console.log(error.message);

    }


}
export const updateDonation =  (id, amount) => async(dispatch) => {
    try{

        const {data}  = await api.donationValueUpdate(id, amount);
        dispatch({type:UPDATE_DONATION_VALUE, payload:data})
    }catch(error){
        console.log(error.message);

    }

}

export const createDonation =  (form) => async(dispatch) => {
    try{
        const {data}  = await api.createDonation(form);
    }catch(error){
        console.log(error.message);
 
    }

}