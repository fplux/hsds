import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as helpers from './helpers';
import * as api from './api';


function* initialize() {
  yield call(helpers.getUser);
  yield call(api.getConfig);
  const events = yield call(helpers.fetchEvents, 1);
  yield put(actions.eventsReceived(events));
}

export default function* saga() {
  yield* takeEvery(actions.INITIALIZED, initialize);
}
