import { createAsyncAction, createReducer } from 'typesafe-actions';
import { Board } from 'MyModels';

export const fetchGetBoardAsync = createAsyncAction(
  'FETCH_GET_BOARD_REQUEST',
  'FETCH_GET_BOARD_SUCCESS',
  'FETCH_GET_BOARD_FAILURE'
)<string, Board[], string>();
