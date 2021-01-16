
import {fetchTodosAsync} from '../redux/actions/actions';
import  * as boardActions from '../redux/actions/boards-action';
import  * as listActions from '../redux/actions/lists-actions';


export default {
  todos: fetchTodosAsync,
  boardActions: boardActions,
  listActions: listActions
};
