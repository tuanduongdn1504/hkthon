import login from './LoginRedux/reducer';
import password from './ForgotPasswordRedux/reducer';
import app from './AppRedux/reducer';
import filter from './FilterRedux/reducer';
import caseTypes from './CaseTypesRedux/reducer';
import Book from './BookRedux/reducer';

export default {
  Book,
  caseTypes,
  app,
  password,
  login,
  filter,
};
