import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from '../features/data/saga';

const env = process.env.NODE_ENV || 'development';

const sagaMiddleware = createSagaMiddleware();

let store;
let loggerMiddleware;
let middleware;

if (env === 'development') {
  loggerMiddleware = createLogger({
    colors: {},
    collapsed: () => true,
  });
  middleware = applyMiddleware(
    loggerMiddleware,
    thunk,
    sagaMiddleware
  );
  store = createStore(
    reducer,
    compose(
      middleware,
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
} else if (env === 'production') {
  loggerMiddleware = null
  middleware = applyMiddleware(
    // loggerMiddleware,
    thunk,
    sagaMiddleware
  );
  store = createStore(
    reducer,
    compose(
      middleware,
      //window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}

sagaMiddleware.run(saga);

export default store;
