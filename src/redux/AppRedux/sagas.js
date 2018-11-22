import { takeLatest, select } from 'redux-saga/effects';
import {
  startWithTabs,
  startStackScreen,
  startWithSideMenu
} from '../../navigation/navigationActions';
import { Types } from './actions';

export function* startup() {
  const { token } = yield select(state => state.login);
  !token ? startStackScreen() : startWithSideMenu();
  // startWithTabs();
}

const appSagas = () => {
  return [takeLatest(Types.STARTUP, startup)];
};

export default appSagas();
