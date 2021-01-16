import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchTodosAsync } from '../redux/actions/actions';
import {
     fetchAddBoardAsync,
     fetchGetBoardsAsync,
     fetchDeleteBoardAsync
    } from '../redux/actions/boards-action';
import {
    fetchGetBoardAsync,
    fetchAddListAsync,
    fetchEditTitleBoardAsync,
    fetchDeleteListAsync,
    sortListsAsync
} from '../redux/actions/board-action';
import {fetchSortSameListAsync} from '../redux/actions/lists-actions';


import BoardsSagas from '../sagas/boards-saga'
import BoardSagas from '../sagas/board-saga'
import ListSagas from '../sagas/list-saga'


export default function* mainSaga() {
    yield all([
        takeEvery(fetchAddBoardAsync.request, BoardsSagas.addBoardSaga),
        takeEvery(fetchGetBoardsAsync.request, BoardsSagas.getBoardsSaga),

        takeEvery(fetchGetBoardAsync.request, BoardSagas.getBoardSaga),
        takeEvery(fetchAddListAsync.request, BoardSagas.addListSaga),
        takeEvery(fetchEditTitleBoardAsync.request, BoardSagas.editTitleBoardSaga),

        takeEvery(fetchDeleteListAsync.request, BoardSagas.deleteListSaga),
        takeEvery(fetchDeleteBoardAsync.request, BoardsSagas.deleteBoardSaga),

        takeEvery(sortListsAsync.request, BoardSagas.sortListsSaga),
        takeEvery(fetchSortSameListAsync.request, ListSagas.sortCardSameSaga),

    ]);
}