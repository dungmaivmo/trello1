import { createAsyncAction, createReducer } from 'typesafe-actions';
import { Board, List } from 'MyModels';

export const fetchGetBoardAsync = createAsyncAction(
    'FETCH_GET_BOARD_REQUEST',
    'FETCH_GET_BOARD_SUCCESS',
    'FETCH_GET_BOARD_FAILURE'
)<string, Board[], string>();

export const fetchAddListAsync = createAsyncAction(
    'FETCH_ADD_LIST_REQUEST',
    'FETCH_ADD_LIST_SUCCESS',
    'FETCH_ADD_LIST_FAILURE'
)<any, string, string>();

export const fetchEditTitleBoardAsync = createAsyncAction(
    'FETCH_EDIT_TITLE_BOARD_REQUEST',
    'FETCH_EDIT_TITLE_BOARD_SUCCESS',
    'FETCH_EDIT_TITLE_BOARD_FAILURE'
)<Object, string, string>();
