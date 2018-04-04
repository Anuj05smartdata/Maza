import { API, DISCOVER } from "../const/const";
export function updatePostionDrawer(p) {
  return dispatch => {
    dispatch({ type: DISCOVER.DRAWER, payload: p });
  };
}

export function discover(
  sortBy = "popularity.desc",
  lang = "en-US",
  adlt = "false",
  video = "false",
  page = 1
) {
  return dispatch => {
    fetch(
      API.ROOT +
      "discover/movie?api_key=" +
      API.KEY +
      "&language=" +
      lang +
      "&sort_by=" +
      sortBy +
      "&include_adult=" +
      adlt +
      "&include_video=" +
      video +
      "&page=" +
      page
    )
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: DISCOVER.DISCOVER, payload: data });
      })
      .catch(function (error) {
        dispatch({ type: DISCOVER.ERROR, payload: error });
      });
  };
}
