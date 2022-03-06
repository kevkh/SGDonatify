import { FETCH_ALL_DONATION, UPDATE_DONATION_VALUE} from '../constants/actionTypes';

export default (donationListings = [], action) => {

    switch (action.type) {
        case FETCH_ALL_DONATION: 
            return action.payload;  

        case UPDATE_DONATION_VALUE: 
            return donationListings.map((listing) => (listing._id === action.payload._id ? action.payload : listing))
            
        default:
            return donationListings;
    }
}