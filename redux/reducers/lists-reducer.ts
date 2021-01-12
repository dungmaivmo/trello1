
import { createAsyncAction, createReducer } from 'typesafe-actions';
import {  fetchGetListAsync} from '../actions/lists-actions';

export const listReducer = createReducer([])
    .handleAction(fetchGetListAsync.success, (state, action) => {
        // console.log("state", action.payload);
        return ([...state.action.payload] )
    })
    // .handleAction(fetchAddListAsync.success, (state, action) =>{
    //     console.log("reducer new list", action.payload)
    //     return  ({...action.payload})
    // });