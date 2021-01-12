import { createAsyncAction, createReducer } from 'typesafe-actions';
export const fetchTodosAsync = createAsyncAction(
    'FETCH_TODOS_REQUEST',
    'FETCH_TODOS_SUCCESS',
    'FETCH_TODOS_FAILURE'
  )<string, string[], Error>();

  // export const fetchTodosAsync = createAsyncAction(
  //   'FETCH_TODOS_REQUEST',
  //   'FETCH_TODOS_SUCCESS',
  //   'FETCH_TODOS_FAILURE'
  // )<string, string[], Error>();

