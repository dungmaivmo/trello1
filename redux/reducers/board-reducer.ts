
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { 
     fetchGetBoardAsync,
     fetchEditTitleBoardAsync,
    //   fetchAddListAsync,
      fetchDeleteListAsync,
      sortListsAsync
    } from '../actions/board-action';

export const boardReducer = createReducer({})
    // .handleAction(fetchAddListAsync.success, (state, action) => {
    //     return ({...state, listID: [...state.listID, action.payload] })
    // })
    .handleAction(fetchGetBoardAsync.success, (state, action) =>{
        return  ({...action.payload})
    })
    .handleAction(fetchEditTitleBoardAsync.success, (state, action) =>{
        return  ({...state, title:action.payload})
    })
    .handleAction(fetchDeleteListAsync.success, (state, action) =>{
        let newListID = state.listID.filter((item: any) => item!== action.payload )
        return  ({...state, listID:[...newListID]})
    })
    .handleAction(sortListsAsync.success, (state, action) =>{
        return  ({...state, listID:action.payload})
    });