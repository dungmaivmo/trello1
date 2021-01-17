import { createAsyncAction, createReducer, createAction } from 'typesafe-actions';
import { List, Card } from 'MyModels';


export const fetchGetListsAsync = createAsyncAction(
  'FETCH_GET_LISTS_REQUEST',
  'FETCH_GET_LISTS_SUCCESS',
  'FETCH_GET_LISTS_FAILURE'
)<string, List[], string>();

export const fetchAddListAsync = createAsyncAction(
  'FETCH_ADD_LIST_REQUEST',
  'FETCH_ADD_LIST_SUCCESS',
  'FETCH_ADD_LIST_FAILURE'
)<any, List, string>();

export const fetchDeleteListAsync = createAsyncAction(
  'FETCH_DELETE_LIST_REQUEST',
  'FETCH_DELETE_LIST_SUCCESS',
  'FETCH_DELETE_LIST_FAILURE'
)<any, string, string>();

export const fetchEditTitleListAsync = createAsyncAction(
  'FETCH_EDIT_TITLE_LIST_REQUEST',
  'FETCH_EDIT_TITLE_LIST_SUCCESS',
  'FETCH_EDIT_TITLE_LIST_FAILURE'
)<any, string, string>();

export const fetchAddCardAsync = createAsyncAction(
  'FETCH_ADD_CARD_REQUEST',
  'FETCH_ADD_CARD_SUCCESS',
  'FETCH_ADD_CARD_FAILURE'
)<any, any, string>();

export const fetchDeleteCard = createAction('FETCH_DELETE_CARD')<any>();
export const fetchEditCard = createAction('FETCH_EDIT_CARD')<any>();
export const fetchSortSameList = createAction('FETCH_EDIT_CARD')<any>();
export const sortLists = createAction('FETCH_SORT_LIST')<any>();





// export const fetchGetListAsync = createAsyncAction(
//   'FETCH_GET_LIST_REQUEST',
//   'FETCH_GET_LIST_SUCCESS',
//   'FETCH_GET_LIST_FAILURE'
// )<string, List, string>();

// export const fetchSortSameListAsync = createAsyncAction(
//   'FETCH_SORT_SAME_LIST_REQUEST',
//   'FETCH_SORT_SAME_LIST_SUCCESS',
//   'FETCH_SORT_SAME_LIST_FAILURE'
// )<Object, string, string>();

//   export const fetchEditTitleListAsync = createAsyncAction(
//     'FETCH_EDIT_TITLE_LIST_REQUEST',
//     'FETCH_EDIT_TITLE_LIST_SUCCESS',
//     'FETCH_EDIT_TITLE_LIST_FAILURE'
// )<Object, string, string>();