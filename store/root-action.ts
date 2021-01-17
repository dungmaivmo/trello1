
import {fetchTodosAsync} from '../redux/actions/notification-action';
import  * as boardActions from '../redux/actions/boards-action';
import  * as listActions from '../redux/actions/lists-actions';


export default {
  todos: fetchTodosAsync,
  boardActions: boardActions,
  listActions: listActions
};
