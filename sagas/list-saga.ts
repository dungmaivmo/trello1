import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchAddBoardAsync, fetchGetBoardsAsync, fetchDeleteBoardAsync } from '../redux/actions/boards-action';
import { handleSortSameList } from '../services/list-service';
import {
  fetchSortSameListAsync,
  fetchGetListsAsync,
  fetchAddListAsync
} from '../redux/actions/lists-actions'
import { handleGetAllByID, handleAdd } from '../services/utils'
import { v4 as uuidv4 } from 'uuid';

const ListSagas = {
  *sortCardSameSaga(action: ReturnType<typeof fetchSortSameListAsync.request>): Generator {
    try {
      yield handleSortSameList(action.payload);
      yield put(fetchSortSameListAsync.success(uuidv4()));
    } catch (err) {
      yield put(fetchSortSameListAsync.failure(err));
    }
  },

  *getListsSaga(action: ReturnType<typeof fetchGetListsAsync.request>): Generator {
    try {
      let data: any = yield handleGetAllByID('list', action.payload, 'boardID');
      console.log("data", data)
      yield put(fetchGetListsAsync.success(data));
    } catch (err) {
      console.log("loi get all list")
      yield put(fetchGetListsAsync.failure(err));
    }
  },

  * addListSaga(action: ReturnType<typeof fetchAddListAsync.request>): Generator {
    try {
      console.log("saga", action.payload)
      yield handleAdd("list", { ...action.payload, cards: [] });
    } catch (err) {
      yield put(fetchAddListAsync.failure(err));
    }
  },
}

export default ListSagas;
