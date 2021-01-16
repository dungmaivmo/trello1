

import { combineReducers } from 'redux'
import {todoReducer} from '../redux/reducers/reducers';
import {boardsReducer} from '../redux/reducers/boards-reducer';
import {boardReducer} from '../redux/reducers/board-reducer';
import {listReducer} from '../redux/reducers/lists-reducer'


const rootReducer:any = combineReducers({
  todoReducer: todoReducer,
  boardsReducer: boardsReducer,
  boardReducer:boardReducer,
  listReducer: listReducer
})

export default rootReducer