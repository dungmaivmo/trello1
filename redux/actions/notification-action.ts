import { createAsyncAction, createReducer } from 'typesafe-actions';
import { Notification } from 'MyModels';

export const notificationAsync = createAsyncAction(
    'NOTIFICATION_REQUEST',
    'NOTIFICATION_SUCCESS',
    'NOTIFICATION_FAILURE'
  )<Notification, boolean, boolean>();

