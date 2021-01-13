import { put, call, takeEvery, all } from 'redux-saga/effects';
import { 
  fetchGetBoardAsync,
   fetchAddListAsync,
   fetchEditTitleBoardAsync
   } from '../redux/actions/board-action';
import { handleGetByID, handleAdd } from '../services/utils';
import { Board } from 'MyModels';
import { handleUpdateListID } from '../services/board-service';
import { handleEditTitle} from '../services/utils';


const BoardSagas = {

  * getBoardSaga(action: ReturnType<typeof fetchGetBoardAsync.request>): Generator {
    try {
      let data: Board = yield handleGetByID("board", action.payload);
      yield put(fetchGetBoardAsync.success(data.length > 0 ? data[0] : []));
    } catch (err) {
      yield put(fetchGetBoardAsync.failure(err));
    }
  },

  * addListSaga(action: ReturnType<typeof fetchAddListAsync.request>): Generator {
    try {
      yield handleAdd("list", { ...action.payload, cards: [] });
      yield handleUpdateListID(action.payload.boardID, action.payload.id);

      yield put(fetchAddListAsync.success(action.payload.id));
    } catch (err) {
      yield put(fetchAddListAsync.failure(err));
    }
  },

  * editTitleBoardSaga(action: ReturnType<typeof fetchEditTitleBoardAsync.request>): Generator {
    try {
      yield handleEditTitle('board',action.payload.id, action.payload.title);
      yield handleEditTitle('boards',action.payload.id, action.payload.title);
      
      yield put(fetchEditTitleBoardAsync.success(action.payload.title));
    } catch (err) {
      yield put(fetchEditTitleBoardAsync.failure(err));
    }
  },
}

export default BoardSagas;
