import {API,TVCONST,METHOD} from '../const/const'
export function onTheAir() {
  return dispatch => {
    fetch(API.ROOT + "tv/on_the_air?api_key=" + API.KEY)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: TVCONST.ONTHEAIR, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: TVCONST.ERROR, payload: error });
      });
  };
}
export function airingToday() {
  return dispatch => {
     fetch(API.ROOT + "tv/airing_today?api_key=" + API.KEY)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: TVCONST.AIRINGTODAY, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: TVCONST.ERROR, payload: error });
      });
  };
}

export function popular() {
  return dispatch => {
    fetch(API.ROOT + "tv/popular?api_key=" + API.KEY)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: TVCONST.POPULAR, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: TVCONST.ERROR, payload: error });
      });
  };
}
export function topRated() {
  return dispatch => {
    fetch(API.ROOT + "tv/popular?api_key=" + API.KEY)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: TVCONST.TOP_RATED, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: TVCONST.ERROR, payload: error });
      });
  };
}

export function sliderData(tv_id, lang = "en-US", page = 1) {
  return async dispatch => {
    await fetch(
      API.ROOT +
        "tv/" +
        tv_id +
        "/images?api_key=" +
        API.KEY +
        "&language=" +
        lang +
        "&include_image_language=en"
    )
      .then(response => response.json())
      .then(responseJson => {
        data = METHOD.generateImages(responseJson.posters);
        dispatch({ type: TVCONST.IMAGE_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: TVCONST.ERROR, payload: error });
      });
  };
}

export function getDetailedInfo(tv_id, lang = "en-US") {
  return dispatch => {
   fetch(API.ROOT + "tv/" + tv_id + "?api_key=" + API.KEY + "&language=" + lang)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson;
        dispatch({ type: TVCONST.INFO_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: TVCONST.ERROR, payload: error });
      });
  };
}

export function getCasts(tv_id, lang = "en-US") {
  return dispatch => {
    fetch(
      API.ROOT +
        "tv/" +
        tv_id +
        "/credits?api_key=" +
        API.KEY +
        "&language=" +
        lang
    )
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson;
        dispatch({ type: TVCONST.CAST_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: TVCONST.ERROR, payload: error });
      });
  };
}
export function getReview(tv_id, lang = "en-US", page = 1) {
  return dispatch => {
   fetch(
      API.ROOT +
        "tv/" +
        tv_id +
        "/reviews?api_key=" +
        API.KEY +
        "&language=" +
        lang +
        "&page=" +
        page
    )
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: TVCONST.REVIEW_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: TVCONST.ERROR, payload: error });
      });
  };
}
