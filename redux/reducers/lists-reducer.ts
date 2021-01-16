
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { 
     fetchSortSameListAsync, 
    fetchGetListsAsync,
    fetchAddListAsync
} from '../actions/lists-actions';
import { v4 as uuidv4 } from 'uuid';
import { List, Card } from 'MyModels';

export const listReducer = createReducer([])
    // .handleAction(fetchSortSameListAsync.success, (state, action) => {
    //     return action.payload ;
    // })
    .handleAction(fetchGetListsAsync.success, (state, action) => {
        return action.payload ;
    })
    .handleAction(fetchAddListAsync.request, (state, action) => {
        return [...state, action.payload] ;
    })
    // .handleAction(fetchSortSameListAsync.success, (state, action) => {
    //     // console.log("state", action.payload);
    //     return ([...state.action.payload] )
    // })
    // .handleAction(fetchAddListAsync.success, (state, action) =>{
    //     console.log("reducer new list", action.payload)
    //     return  ({...action.payload})
    // });