
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { fetchAddBoardAsync, fetchGetBoardsAsync } from '../actions/boards-action';

export const boardsReducer = createReducer([])
    .handleAction(fetchAddBoardAsync.success, (state, action) => {
        // console.log("state", action.payload);
        return ([...state, action.payload])
    })
    .handleAction(fetchGetBoardsAsync.success, (state, action) =>{
        // console.log("reducer", action.payload)
        return  ([...action.payload])
    });