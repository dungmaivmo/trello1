import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
    fetchAddBoardAsync,
    fetchGetBoardsAsync,
    fetchDeleteBoardAsync
} from '../redux/actions/boards-action';
import {
    fetchGetBoardAsync,
    // fetchAddListAsync,
    fetchEditTitleBoardAsync,
    sortListsAsync
} from '../redux/actions/board-action';
import {
    fetchSortSameList,
    fetchGetListsAsync,
    fetchDeleteListAsync,
    fetchAddListAsync,
    fetchEditTitleListAsync,
    fetchAddCardAsync,
    fetchDeleteCard,
    fetchEditCard,
    sortLists
} from '../redux/actions/lists-actions';


import BoardsSagas from '../sagas/boards-saga'
import BoardSagas from '../sagas/board-saga'
import ListSagas from '../sagas/list-saga'


export default function* mainSaga() {
    yield all([
        takeEvery(fetchAddBoardAsync.request, BoardsSagas.addBoardSaga),
        takeEvery(fetchGetBoardsAsync.request, BoardsSagas.getBoardsSaga),
        takeEvery(fetchEditTitleBoardAsync.request, BoardSagas.editTitleBoardSaga),
        takeEvery(fetchGetBoardAsync.request, BoardSagas.getBoardSaga),
        // takeEvery(fetchAddListAsync.request, ListSagas.addListSaga),
        takeEvery(fetchDeleteBoardAsync.request, BoardsSagas.deleteBoardSaga),
        // takeEvery(sortListsAsync.request, BoardSagas.sortListsSaga),

        takeEvery(fetchAddListAsync.request, ListSagas.addListSaga),
        takeEvery(fetchAddCardAsync.request, ListSagas.addCardSaga),
        takeEvery(fetchDeleteListAsync.request, ListSagas.deleteListSaga),
        takeEvery(fetchEditTitleListAsync.request, ListSagas.editTitleListSaga),
        takeEvery(fetchDeleteCard, ListSagas.deleteCardSaga),
        takeEvery(fetchEditCard, ListSagas.editCardSaga),


        takeEvery(fetchSortSameList, ListSagas.sortCardSameSaga),
        takeEvery(sortLists, ListSagas.sortListSaga),

        
        takeEvery(fetchGetListsAsync.request, ListSagas.getListsSaga),


    ]);
}