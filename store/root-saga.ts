import { put, call, takeEvery, all } from 'redux-saga/effects';
import {fetchTodosAsync} from '../redux/actions/actions';
import {fetchAddBoardAsync, fetchGetBoardsAsync} from '../redux/actions/boards-action';
import {fetchGetBoardAsync, fetchAddListAsync} from '../redux/actions/board-action';


import TestSagas from '../sagas/test';
import BoardsSagas from '../sagas/boards-saga'
import BoardSagas from '../sagas/board-saga'


export default function* mainSaga() {
    yield all([
        takeEvery(fetchAddBoardAsync.request, BoardsSagas.addBoardSaga),
        takeEvery(fetchGetBoardsAsync.request, BoardsSagas.getBoardsSaga),

        takeEvery(fetchGetBoardAsync.request, BoardSagas.getBoardSaga),
        takeEvery(fetchAddListAsync.request, BoardSagas.addListSaga),


    ]);
}