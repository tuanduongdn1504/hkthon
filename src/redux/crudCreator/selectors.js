import { createSelector } from 'reselect';
const getRestData = (state, resources) => state[resources];

export const getDataArr = createSelector(
  [getRestData],
  resources => {
    const { data, ids } = resources;
    return ids.map(id => data[id]);
  }
);

export const getTotal = createSelector(
  [getRestData],
  resources => {
    const { total } = resources;
    return total;
  }
);

export const getCurrentData = createSelector(
  [getRestData],
  resources => {
    const { currentId, data } = resources;
    return data[currentId] || {};
  }
);

export const enabledLoadMore = createSelector(
  [getRestData],
  resources => {
    const { page, loading, numberOfPages } = resources;
    return !loading && page < numberOfPages;
  }
);

export const getLoading = createSelector(
  [getRestData],
  resources => {
    const { loading } = resources;
    return loading;
  }
);
