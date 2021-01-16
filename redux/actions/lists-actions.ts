import { createAsyncAction, createReducer } from 'typesafe-actions';
import { List, Card } from 'MyModels';


export const fetchGetListAsync = createAsyncAction(
    'FETCH_GET_LIST_REQUEST',
    'FETCH_GET_LIST_SUCCESS',
    'FETCH_GET_LIST_FAILURE'
  )<string, List, string>();

  export const fetchSortSameListAsync = createAsyncAction(
    'FETCH_SORT_SAME_LIST_REQUEST',
    'FETCH_SORT_SAME_LIST_SUCCESS',
    'FETCH_SORT_SAME_LIST_FAILURE'
  )<Object, string, string>();

//   export const fetchEditTitleListAsync = createAsyncAction(
//     'FETCH_EDIT_TITLE_LIST_REQUEST',
//     'FETCH_EDIT_TITLE_LIST_SUCCESS',
//     'FETCH_EDIT_TITLE_LIST_FAILURE'
// )<Object, string, string>();