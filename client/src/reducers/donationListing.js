import { FETCH_ALL_DONATION} from '../constants/actionTypes';

export default (donationListings = [], action) => {

    switch (action.type) {
        case FETCH_ALL_DONATION: 
            return action.payload;  //action.payload = actual form
            
        default:
            return donationListings;
    }
}