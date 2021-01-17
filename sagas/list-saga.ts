import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchAddBoardAsync, fetchGetBoardsAsync, fetchDeleteBoardAsync } from '../redux/actions/boards-action';
import { handleSortSameList } from '../services/list-service';
import {
  fetchSortSameList,
  fetchGetListsAsync,
  fetchAddListAsync,
  fetchDeleteListAsync,
  fetchEditTitleListAsync,
  fetchAddCardAsync,
  fetchDeleteCard,
  fetchEditCard,
  sortLists
} from '../redux/actions/lists-actions'
import {
  handleDeleteList,
  handleAddCard,
  handleDeleteCardID,
  handleEditCard,
  handleSortLists
} from '../services/list-service'
import {
  handleGetAllByID,
  handleAdd,
  handleDelete,
  handleEditTitle
} from '../services/utils'
import { v4 as uuidv4 } from 'uuid';

const ListSagas = {
  *sortCardSameSaga(action: ReturnType<typeof fetchSortSameList>): Generator {
    try {
      yield handleSortSameList(action.payload);
    } catch (err) {
      console.log(err)
    }
  },
  
  *sortListSaga(action: ReturnType<typeof sortLists>): Generator {
    try {
      yield handleSortLists(action.payload.boardID, action.payload.sourceIndex, action.payload.destinationIndex);
    } catch (err) {
      console.log(err)
    }
  },

  *getListsSaga(action: ReturnType<typeof fetchGetListsAsync.request>): Generator {
    try {
      let data: any = yield handleGetAllByID('list', action.payload, 'boardID');
      yield put(fetchGetListsAsync.success(data));
    } catch (err) {
      yield put(fetchGetListsAsync.failure(err));
    }
  },

  * addListSaga(action: ReturnType<typeof fetchAddListAsync.request>): Generator {
    try {
      yield handleAdd("list", { ...action.payload, cards: [] });
    } catch (err) {
      yield put(fetchAddListAsync.failure(err));
    }
  },

  * addCardSaga(action: ReturnType<typeof fetchAddCardAsync.request>): Generator {
    try {
      yield handleAddCard(action.payload.listID, action.payload.card);
    } catch (err) {
      yield put(fetchAddCardAsync.failure(err));
    }
  },

  *deleteListSaga(action: ReturnType<typeof fetchDeleteListAsync.request>): Generator {
    try {
      yield handleDeleteList(action.payload.boardID, action.payload.indexList, action.payload.id);
    } catch (err) {
      yield put(fetchDeleteListAsync.failure(err));
    }
  },

  * editTitleListSaga(action: ReturnType<typeof fetchEditTitleListAsync.request>): Generator {
    try {
      yield handleEditTitle('list', action.payload.id, action.payload.title);
    } catch (err) {
      yield put(fetchEditTitleListAsync.failure(err));
    }
  },

  *deleteCardSaga(action: ReturnType<typeof fetchDeleteCard>): Generator {
    try {
      yield handleDeleteCardID(action.payload.listID, action.payload.id);
    } catch (err) {
      console.log(err)
    }
  },

  * editCardSaga(action: ReturnType<typeof fetchEditCard>): Generator {
    try {
      yield handleEditCard(action.payload.listID, action.payload.id, action.payload.text);
    } catch (err) {
      console.log(err)
    }
  },



  * editAddCardSaga(action: ReturnType<typeof fetchAddCardAsync.request>): Generator {
    try {
      // yield handleEditTitle('list',action.payload.id, action.payload.title);
    } catch (err) {
      yield put(fetchAddCardAsync.failure(err));
    }
  },
}

export default ListSagas;
