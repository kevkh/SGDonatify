import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';  // able to use all

// Action creators, (dealing with async, we add another dispatch func using redux thunk)
export const getForm =  () => async(dispatch) => {
    try{
        const { data } = await api.fetchForm(); // get from backend
        dispatch({ type: FETCH_ALL, payload: data })
    }catch(error){
        console.log(error.message);

    }

}

export const createForm = (post) => async (dispatch) => {
    try{
        const { data } = await api.createForm(post); // sending a list req

        dispatch( {type: CREATE, payload: data })

    }catch(error){
        console.log(error.message);

    }
}

export const updateForm = (id, list) => async (dispatch) => {
    try {
      const { data } = await api.updateForm(id, list); //data of updatedform
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  // export const likeListing = (id) => async (dispatch) => {
  //   try {
  //     const { data } = await api.likeListing(id);
  
  //     dispatch({ type: LIKE, payload: data });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  
  export const deleteForm = (id) => async (dispatch) => {
    try {
      await api.deleteForm(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };

