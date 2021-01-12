import { createAsyncAction, createReducer } from 'typesafe-actions';
import { List } from 'MyModels';

export const fetchGetListAsync = createAsyncAction(
    'FETCH_GET_LIST_REQUEST',
    'FETCH_GET_LIST_SUCCESS',
    'FETCH_GET_LIST_FAILURE'
  )<string, List, string>();