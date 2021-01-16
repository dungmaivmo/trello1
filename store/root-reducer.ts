

import { combineReducers } from 'redux'
import {notificationReducer} from '../redux/reducers/notification-reducer';
import {boardsReducer} from '../redux/reducers/boards-reducer';
import {boardReducer} from '../redux/reducers/board-reducer';
import {listReducer} from '../redux/reducers/lists-reducer'


const rootReducer:any = combineReducers({
  notification: notificationReducer,
  boards: boardsReducer,
  board:boardReducer,
  listReducer: listReducer
})

export default rootReducer