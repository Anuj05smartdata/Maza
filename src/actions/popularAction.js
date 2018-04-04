import {API,POPULAR, METHOD} from '../const/const';
export function popularPeople(lang = "en-US", page = 1) {
  return dispatch => {
    fetch(
      API.ROOT + "person/popular?api_key=" + API.KEY + "&language=" + lang + "&page=" + page )
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type:POPULAR.PERSON_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type:POPULAR.ERROR, payload: error });
      });
  };
}

export function sliderData(person_id) {
  return async dispatch => {
    await fetch(API.ROOT + "person/" + person_id + "/images?api_key=" + API.KEY)
      .then(response => response.json())
      .then(responseJson => {
        data = METHOD.generateImages(responseJson.profiles);
        dispatch({ type:POPULAR.PERSON_IMAGE_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type:POPULAR.ERROR, payload: error });
      });
  };
}

export function getDetailedInfo(person_id) {
  return async dispatch => {
    await fetch(API.ROOT + "person/" + person_id + "?api_key=" + API.KEY)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson;
        dispatch({ type:POPULAR.PERSON_DETAIL_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type:POPULAR.ERROR, payload: error });
      });
  };
}
export function getTVShowbyPerson(person_id, lang = "en-US",sortBy = "popularity.desc", adlt = "false", video = "false", page = 1){
  return dispatch => {
    fetch(API.ROOT+"discover/tv?api_key=" +API.KEY +"&language=" +lang +"&sort_by=" +sortBy +"&include_adult=" +adlt +"&include_video=" +video +"&page=" +page+"&with_people="+person_id)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type:POPULAR.TV_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type:POPULAR.ERROR, payload: error });
      });
  };
}

export function getMoviebyPerson(person_id, lang = "en-US",sortBy = "popularity.desc", adlt = "false", video = "false", page = 1) {
  return dispatch => {
    fetch(API.ROOT+"discover/movie?api_key=" +API.KEY +"&language=" +lang +"&sort_by=" +sortBy +"&include_adult=" +adlt +"&include_video=" +video +"&page=" +page+"&with_people="+person_id)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type:POPULAR.MOVIE_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type:POPULAR.ERROR, payload: error });
      });
  };
}