
import { createAsyncAction, createReducer } from 'typesafe-actions';
import {  fetchGetBoardAsync,fetchEditTitleBoardAsync, fetchAddListAsync} from '../actions/board-action';

export const boardReducer = createReducer({})
    .handleAction(fetchAddListAsync.success, (state, action) => {
        return ({...state, listID: [...state.listID, action.payload] })
    })
    .handleAction(fetchGetBoardAsync.success, (state, action) =>{
        return  ({...action.payload})
    })
    .handleAction(fetchEditTitleBoardAsync.success, (state, action) =>{
        return  ({...state, title:action.payload})
    });