import { all } from 'redux-saga/effects';
import loginSagas from './LoginRedux/sagas';
import appSagas from './AppRedux/sagas';
import ForgotPasswordSagas from './ForgotPasswordRedux/sagas';
import caseTypesSagas from './CaseTypesRedux/sagas';
import BookSagas from './BookRedux/sagas';

export default function* root() {
  yield all([
    ...BookSagas,
    ...caseTypesSagas,...ForgotPasswordSagas, ...appSagas, ...loginSagas]);
}
