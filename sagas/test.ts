import { put, call, takeEvery, all } from 'redux-saga/effects';
import {fetchTodosAsync} from '../redux/actions/actions';

const TestSagas = {

    * addTodoSaga(action: ReturnType<typeof fetchTodosAsync.request>): Generator {
    try {
        console.log("saga test", action.payload)
    //   const response: Todo[] = yield call(todosApi.getAll, action.payload);
    
  
      yield put(fetchTodosAsync.success({data:"sss ok"}));
    } catch (err) {
      yield put(fetchTodosAsync.failure(err));
    }
  }
}

export default TestSagas;
 