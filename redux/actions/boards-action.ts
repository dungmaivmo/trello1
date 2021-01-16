import { createAsyncAction, createReducer } from 'typesafe-actions';
import { Boards } from 'MyModels';

export const fetchAddBoardAsync = createAsyncAction(
  'FETCH_ADD_BOARD_REQUEST',
  'FETCH_ADD_BOARD_SUCCESS',
  'FETCH_ADD_BOARD_FAILURE'
)<Boards, Boards[], string>();

export const fetchDeleteBoardAsync = createAsyncAction(
  'FETCH_DELETE_BOARD_REQUEST',
  'FETCH_DELETE_BOARD_SUCCESS',
  'FETCH_DELETE_BOARD_FAILURE'
)<string, string, string>();

export const fetchGetBoardsAsync = createAsyncAction(
  'FETCH_GET_BOARDS_REQUEST',
  'FETCH_GET_BOARDS_SUCCESS',
  'FETCH_GET_BOARDS_FAILURE'
)<null, Boards[], string>();

export const loadBoardAsync = createAsyncAction(
  'LOAD_BOARDS_REQUEST',
  'LOAD_BOARDS_SUCCESS',
  'LOAD_BOARDS_FAILURE'
)<undefined, Boards[], string>();



