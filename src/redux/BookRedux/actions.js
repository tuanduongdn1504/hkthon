import {
  makeCRUDConstantCreator,
  makeCRUDActionsCreator,
} from '../crudCreator/actions';

export const MODEL = 'Book';
export const IGNORE_ACTIONS = [];
export const BookTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
};
const CRUDBookActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);
/**
 * getAllBook({pageSize, page })
 * getByIdBook(data)
 * createBook(data)
 * deleteBook()
 * editBook(data)
 */
export default { ...CRUDBookActions };
