import { call, put, takeLatest, take, race } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import Actions, { LoginTypes } from './actions';
import AppActions from '../AppRedux/actions';
import {
  login,
  register,
  getInfo,
  updatePassword,
  editUser,
  loginFacebook,
  becomeTutor
} from '../../api/auth';
import {
  startStackScreen,
  showInAppNoti,
  showProgress
} from '../../navigation/navigationActions';
import { apiWrapper } from '../../utils/reduxUtils';

export function* signOut() {
  try {
    startStackScreen();
    yield race([
      take('DELETE_DEVICE_TOKENS_SUCCESS'),
      take('DELETE_DEVICE_TOKENS_FAILURE')
    ]);
    global.token = null;
  } catch (error) {
    // console.log(error);
  }
}

export function* signUp({ data }) {
  try {
    const response = yield call(apiWrapper, true, register, data);

    if (!response || !response.token) {
      yield put(Actions.signUpFailure(response));
      showInAppNoti('', response.message, 'error');
    }
    yield put(Actions.signInSuccess(response));
    global.token = response.token;
    yield put(Actions.getUser());
    yield put(AppActions.startup());
  } catch (err) {
    yield put(Actions.signUpFailure(err));
    if (err && err.error && err.error.response) {
      showInAppNoti(
        '',
        I18n.t('error.signup', { message: 'tài khoản' }),
        'error'
      );
    }
  }
}

export function* signIn({ data }) {
  try {
    const response = yield call(apiWrapper, true, login, data);
    if (!response || !response.token) {
      yield put(Actions.signInFailure(response));
      showInAppNoti('', I18n.t('error.login'), 'error');
      return;
    }
    yield put(Actions.signInSuccess(response));
    global.token = response.token;
    yield put(Actions.getUser());
    yield put(AppActions.startup());
    yield put();
  } catch (err) {
    showInAppNoti('', I18n.t('error.login'), 'error');
    yield put(Actions.signInFailure(err));
  }
}

export function* getUser() {
  try {
    const response = yield call(apiWrapper, true, getInfo);
    if (!response) {
      yield put(Actions.updateUserFailure(response));
      return;
    }
    yield put(Actions.updateUserSuccess(response.data));
  } catch (err) {
    yield put(Actions.updateUserFailure(err));
  }
}

export function* editUserSaga({ data }) {
  try {
    const response = yield call(editUser, { ...data });
    if (!response || !response.success) {
      yield put(Actions.updateUserFailure(response));
      return;
    }
    yield put(Actions.updateUserSuccess(response.data));
  } catch (err) {
    yield put(Actions.updateUserFailure(err));
  }
}

export function* changePassword({ data }) {
  try {
    const response = yield call(updatePassword, data);
    if (!response || !response.success) {
      yield put(Actions.updateUserFailure(response));
      return;
    }
    yield put(Actions.updateUserSuccess(response.user));
  } catch (err) {
    yield put(Actions.updateUserFailure(err));
  }
}

export function* fbSignIn() {
  try {
    // const accessToken = yield call(facebookSignInApi);
    const accessToken = '';
    showProgress(true);
    const response = yield call(loginFacebook, accessToken);
    showProgress(false);
    if (response && !response.token) {
      yield put(Actions.signInFailure(response));
      return;
    }
    yield put(Actions.signInSuccess(response));
    global.token = response.token;
    yield put(Actions.getUser());
    yield put(AppActions.startup());
  } catch (err) {
    showProgress(false);
    yield put(Actions.signInFailure(err));
  }
}

export function* becomeTutorSaga({ data }) {
  try {
    const response = yield call(becomeTutor, data);
    if (!response || !response.success) {
      yield put(Actions.updateUserFailure(response));
      return;
    }
    yield put(Actions.updateUserSuccess(response.data));
  } catch (err) {
    yield put(Actions.updateUserFailure(err));
  }
}

const loginSagas = () => [
  takeLatest(LoginTypes.SIGN_UP, signUp),
  takeLatest(LoginTypes.SIGN_IN, signIn),
  takeLatest(LoginTypes.SIGN_OUT, signOut),
  takeLatest(LoginTypes.GET_USE, getUser),
  takeLatest(LoginTypes.EDIT_USER, editUserSaga),
  takeLatest(LoginTypes.FB_LOGIN, fbSignIn),
  takeLatest(LoginTypes.BECOME_TUTOR, becomeTutorSaga)
];

export default loginSagas();
