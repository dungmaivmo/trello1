
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { fetchAddBoardAsync, fetchGetBoardsAsync, fetchDeleteBoardAsync } from '../actions/boards-action';
import { Boards } from 'MyModels';

export const boardsReducer = createReducer([])
    .handleAction(fetchAddBoardAsync.success, (state, action) => {
        // console.log("state", action.payload);
        return ([...state, action.payload])
    })
    .handleAction(fetchGetBoardsAsync.success, (state, action) =>{
        // console.log("reducer", action.payload)
        return  ([...action.payload])
    })
    .handleAction(fetchDeleteBoardAsync.success, (state, action) =>{
        let newBoards: Boards[] = state.filter((item: Boards)=> item.id !== action.payload)
        return  ([...newBoards])
    });