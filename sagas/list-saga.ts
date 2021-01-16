import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchAddBoardAsync, fetchGetBoardsAsync, fetchDeleteBoardAsync } from '../redux/actions/boards-action';
import { handleSortSameList } from '../services/list-service';
import {fetchSortSameListAsync} from '../redux/actions/lists-actions'
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
}

export default ListSagas;
