import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const LoginTypes = makeConstantCreator(
  'CLOSE_FIRST_TIME',
  'SIGN_IN',
  'SIGN_IN_SUCCESS',
  'SIGN_IN_FAILURE',

  'USER_GET_INFOR',
  'USER_GET_INFOR_SUCCESS',
  'USER_GET_INFOR_FAILURE',

  'SIGN_UP',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAILURE',

  // 'USER_FORGOT',
  // 'USER_FORGOT_SUCCESS',
  // 'USER_FORGOT_FAILURE',

  'GOOGLE_LOGIN',
  'GOOGLE_LOGIN_SUCCESS',
  'GOOGLE_LOGIN_FAILURE',

  'FB_LOGIN',
  'FB_LOGIN_SUCCESS',
  'FB_LOGIN_FAILURE',

  'TWITTER_LOGIN',
  'TWITTER_LOGIN_SUCCESS',
  'TWITTER_LOGIN_FAILURE',

  'SIGN_OUT',
  'CHANGE_PASSWORD',
  'GET_USE',
  'EDIT_USER',
  'UPDATE_USER_SUCCESS',
  'UPDATE_USER_FAILURE',

  'BECOME_TUTOR',
  'PRE_BECOME_TUTOR'
);

const closeFirstTime = () => makeActionCreator(LoginTypes.CLOSE_FIRST_TIME);
const signOut = () => makeActionCreator(LoginTypes.SIGN_OUT);
const signIn = data => makeActionCreator(LoginTypes.SIGN_IN, { data });
const signInSuccess = response =>
  makeActionCreator(LoginTypes.SIGN_IN_SUCCESS, { response });
const signInFailure = error =>
  makeActionCreator(LoginTypes.SIGN_IN_FAILURE, { error });

const signUp = data => makeActionCreator(LoginTypes.SIGN_UP, { data });
const signUpSuccess = data =>
  makeActionCreator(LoginTypes.SIGN_UP_SUCCESS, { data });
const signUpFailure = error =>
  makeActionCreator(LoginTypes.SIGN_UP_FAILURE, { error });

const getUser = data => makeActionCreator(LoginTypes.GET_USE, { data });
const editUser = data => makeActionCreator(LoginTypes.EDIT_USER, { data });
const updateUserSuccess = data =>
  makeActionCreator(LoginTypes.UPDATE_USER_SUCCESS, { data });
const updateUserFailure = errorCode =>
  makeActionCreator(LoginTypes.UPDATE_USER_FAILURE, { errorCode });

const changePassword = data =>
  makeActionCreator(LoginTypes.CHANGE_PASSWORD, { data });

const fbSignIn = () => makeActionCreator(LoginTypes.FB_LOGIN);
const fbSignInSuccess = token =>
  makeActionCreator(LoginTypes.FB_LOGIN_SUCCESS, { token });
const fbSignInFailure = errorCode =>
  makeActionCreator(LoginTypes.FB_LOGIN_FAILURE, { errorCode });

const becomeTutor = data =>
  makeActionCreator(LoginTypes.BECOME_TUTOR, { data });
const preBecomeTutor = data =>
  makeActionCreator(LoginTypes.PRE_BECOME_TUTOR, { data });

export default {
  closeFirstTime,
  signIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  // forgotPassword,
  // forgotPasswordSuccess,
  // forgotPasswordFailure,
  getUser,
  changePassword,
  editUser,
  updateUserFailure,
  updateUserSuccess,
  signOut,
  fbSignIn,
  fbSignInSuccess,
  fbSignInFailure,
  becomeTutor,
  preBecomeTutor
};
