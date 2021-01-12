
import {fetchTodosAsync} from '../redux/actions/actions';
import  * as boardActions from '../redux/actions/boards-action';

export default {
  todos: fetchTodosAsync,
  boardActions: boardActions
};
