import { put, call, takeEvery, all } from 'redux-saga/effects';
import { 
  fetchGetBoardAsync,
   fetchEditTitleBoardAsync,
   fetchDeleteListAsync,
   sortListsAsync
   } from '../redux/actions/board-action';
import { handleGetByID, handleAdd } from '../services/utils';
import { Board } from 'MyModels';
import { handleUpdateListID,handleSortLists, handleDeleteListID } from '../services/board-service';
import { handleEditTitle, handleDelete} from '../services/utils';


const BoardSagas = {

  * getBoardSaga(action: ReturnType<typeof fetchGetBoardAsync.request>): Generator {
    try {
      let data: any = yield handleGetByID("boards", action.payload);
      yield put(fetchGetBoardAsync.success(data));
    } catch (err) {
      yield put(fetchGetBoardAsync.failure(err));
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

  *deleteListSaga(action: ReturnType<typeof fetchDeleteListAsync.request>): Generator {
    try {
      yield handleDelete('list',action.payload.id);
      yield handleDeleteListID(action.payload.boardID,action.payload.id);
      
      yield put(fetchDeleteListAsync.success(action.payload.id));
    } catch (err) {
      yield put(fetchDeleteListAsync.failure(err));
    }
  },

  *sortListsSaga(action: ReturnType<typeof sortListsAsync.request>): Generator {
    try {
      yield handleSortLists(action.payload.boardID,action.payload.newListID);      
      yield put(sortListsAsync.success(action.payload.newListID));
    } catch (err) {
      yield put(sortListsAsync.failure(err));
    }
  },
}

export default BoardSagas;
