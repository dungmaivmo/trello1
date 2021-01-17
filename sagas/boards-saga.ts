import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchAddBoardAsync, fetchGetBoardsAsync, fetchDeleteBoardAsync } from '../redux/actions/boards-action';
import { Boards } from 'MyModels';
import { handleGetAll, handleAdd, handleDelete } from '../services/utils';
import { handleDeleteListIDs } from '../services/board-service'
import {notificationAsync} from '../redux/actions/notification-action'
const BoardsSagas = {

    * addBoardSaga(action: ReturnType<typeof fetchAddBoardAsync.request>): Generator {
        try {
            yield handleAdd("boards", action.payload);
            
            // yield handleAdd("board", { ...action.payload, listID: [] });
            // yield put(fetchAddBoardAsync.success(action.payload));
        } catch (err) {
            yield put(notificationAsync.failure(true));
        }
    },

    * getBoardsSaga(action: ReturnType<typeof fetchGetBoardsAsync.request>): Generator {
        try {
            let data: Boards[] = yield handleGetAll("boards");
            yield put(fetchGetBoardsAsync.success(data));
        } catch (err) {
            yield put(notificationAsync.failure(true));
        }
    },

    * deleteBoardSaga(action: ReturnType<typeof fetchDeleteBoardAsync.request>): Generator {
        try {
            yield handleDelete("boards", action.payload);
            yield handleDelete("board", action.payload);
            yield handleDeleteListIDs(action.payload);
            yield put(fetchDeleteBoardAsync.success(action.payload));
        } catch (err) {
            yield put(notificationAsync.failure(true));
        }
    },
}

export default BoardsSagas;
