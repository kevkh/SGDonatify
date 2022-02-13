import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (forms = [], action) => {
    // if(action.type == 'CREATE'){
    //     return action
    // }

    switch (action.type) {
        case FETCH_ALL: 
            return action.payload;  //action.payload = actual form

        case CREATE: 
            // return forms;
            return [...forms, action.payload]; // action stored in payload

        case UPDATE:
            return forms.map((form) => (form._id === action.payload._id ? action.payload : form));
              
              
        case DELETE:
            return forms.filter((form) => form._id !== action.payload);
            
        // same as update
        // case LIKE:
        //     return forms.map((form) => (form._id === action.payload._id ? action.payload : form));
            
        default:
            return forms;
    }
}