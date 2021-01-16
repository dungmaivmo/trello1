
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { notificationAsync } from '../actions/notification-action';
import { Notification } from 'MyModels';
import { Satellite } from '@material-ui/icons';

export const notificationReducer = createReducer({})
    .handleAction(notificationAsync.failure, (state, action) => {
        return { ...state, status: action.payload };
    })
    .handleAction(notificationAsync.request, (state, action) => {
        return action.payload;
    })