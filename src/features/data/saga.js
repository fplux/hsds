import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import firebase from '../../../firebase';
import store from '../../store';
import * as actions from './actions';
import * as helpers from './helpers';


function getLoggedInUser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject(Error('It broke'));
      }
    });
  });
}

function* initialize() {
  getLoggedInUser().then((uid) => {
    const userInfo = helpers.getUserPermissions(uid);
    const user = {
      id: uid,
    };
    store.dispatch(actions.setUser(user));
  });

  const events = yield call(helpers.fetchEvents, 1);

  yield put(actions.eventsReceived(events));
}

export default function* saga() {
  yield* takeEvery(actions.INITIALIZED, initialize);
}
