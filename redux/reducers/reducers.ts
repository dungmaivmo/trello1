
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { fetchTodosAsync } from '../actions/actions';

export const todoReducer = createReducer({})
    .handleAction(fetchTodosAsync.success, (state, action) => ({ ...state, todoReducer: action.payload }));