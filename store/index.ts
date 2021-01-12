import { createStore, applyMiddleware, compose  } from 'redux';
import createSagaMiddleware  from 'redux-saga';

// import { composeEnhancers } from './utils';

import rootReducer from './root-reducer';

import mainSaga from './root-saga';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
const composeEnhancers:any = compose;


const sagaMiddleware = createSagaMiddleware()

// configure middlewares
const middlewares = [sagaMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

// then run the saga
sagaMiddleware.run(mainSaga)

// export store singleton instance
export default store;
