import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchAddBoardAsync, fetchGetBoardsAsync } from '../redux/actions/boards-action';
import { Boards } from 'MyModels';
import { handleGetAll, handleAdd } from '../services/utils';


const BoardsSagas = {

    * addBoardSaga(action: ReturnType<typeof fetchAddBoardAsync.request>): Generator {
        try {
            yield handleAdd("boards", action.payload);
            yield handleAdd("board",{... action.payload, listID:[]});
        yield put(fetchAddBoardAsync.success(action.payload));
        } catch (err) {
            yield put(fetchAddBoardAsync.failure(err));
        }
    },

    * getBoardsSaga(action: ReturnType<typeof fetchGetBoardsAsync.request>): Generator {
        try {
            let data: Boards[] = yield handleGetAll("boards");
            yield put(fetchGetBoardsAsync.success(data));
        } catch (err) {
            yield put(fetchGetBoardsAsync.failure(err));
        }
    }
}

export default BoardsSagas;
