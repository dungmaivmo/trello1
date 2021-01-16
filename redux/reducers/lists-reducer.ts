
import { createAsyncAction, createReducer } from 'typesafe-actions';
import {  fetchSortSameListAsync} from '../actions/lists-actions';
import { v4 as uuidv4 } from 'uuid';

export const listReducer = createReducer('')
    .handleAction(fetchSortSameListAsync.success, (state, action) => {
        return action.payload ;
    })
    // .handleAction(fetchSortSameListAsync.success, (state, action) => {
    //     // console.log("state", action.payload);
    //     return ([...state.action.payload] )
    // })
    // .handleAction(fetchAddListAsync.success, (state, action) =>{
    //     console.log("reducer new list", action.payload)
    //     return  ({...action.payload})
    // });