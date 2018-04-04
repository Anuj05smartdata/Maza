import { Actions } from "react-native-router-flux";
import {API, INDEX, METHOD} from '../const/const';
export function launch() {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: INDEX.LAUNCH, payload: [] });
    }, 1);
  };
}

export function updateListView() {
  return dispatch => {
    dispatch({ type: INDEX.LISTVIEWUPDATE });
  };
}

export function nowPlaying(lang = "en-US", page = 1) {
  return dispatch => {
    fetch(
      API.ROOT + "movie/now_playing?api_key=" +API.KEY + "&language=" + lang + "&page=" +page)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: INDEX.NOWPLAYING, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}

export function topBoxOffice(lang = "en-US", page = 1) {
  return dispatch => {
    fetch( API.ROOT + "movie/top_rated?api_key=" +API.KEY +"&language=" +lang +"&page=" +page)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type:INDEX.TOP_RATED, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}

export function getAnticipated(lang = "en-US", page = 1) {
  return dispatch => {
     fetch( API.ROOT +"movie/popular?api_key=" +API.KEY +"&language=" +lang +"&page=" +page)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: INDEX.ANTICIPATED, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}

export function getUpcoming(lang = "en-US", page = 1) {
  return dispatch => {
    fetch(
      API.ROOT +
        "movie/upcoming?api_key=" +
        API.KEY +
        "&language=" +
        lang +
        "&page=" +
        page
    )
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: INDEX.UPCOMING, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}

export function search(query, lang = "en-US", page = 1, include_adult = false) {
  return dispatch => {
    fetch(
      API.ROOT +
        "search/multi?api_key=" +
        API.KEY +
        "&language=" +
        lang +
        "&page=" +
        page +
        "&include_adult=" +
        include_adult +
        "&query=" +
        query
    )
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: INDEX.SEARCH_RESULTS, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}

export function sliderData(
  movie_id,
  lang = "en-US",
  page = 1,
  include_adult = false
) {
  return async dispatch => {
    await fetch(
      API.ROOT +
        "movie/" +
        movie_id +
        "/images?api_key=" +
        API.KEY +
        "&language=" +
        lang +
        "&include_image_language=en"
    )
      .then(response => response.json())
      .then(responseJson => {
        data = METHOD.generateImages(responseJson.posters);
        dispatch({ type: INDEX.IMAGE_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}

export function getDetailedInfo(
  movie_id,
  lang = "en-US",
  page = 1,
  include_adult = false
) {
  return dispatch => {
    fetch(
      API.ROOT + "movie/" + movie_id + "?api_key=" + API.KEY + "&language=" + lang
    )
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson;
        dispatch({ type: INDEX.INFO_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}

export function getCasts(movie_id) {
  return dispatch => {
    fetch(API.ROOT + "movie/" + movie_id + "/casts?api_key=" + API.KEY)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson;
        dispatch({ type: INDEX.CAST_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}
export function getReview(movie_id, lang = "en-US", page = 1) {
  return dispatch => {
    fetch(
      API.ROOT +
        "movie/" +
        movie_id +
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
        dispatch({ type: INDEX.REVIEW_FOUND, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}

export function filter(arr, filter) {
  return dispatch => {
    let obj = [];
    _.filter(arr, item => {
      if (item.media_type == filter) obj.push(item);
    });
    filter == "movie"
      ? dispatch({
          type: INDEX.FILTER_MOVIES,
          payload: obj
        })
      : filter == "tv"
        ? dispatch({
            type: INDEX.FILTER_TV,
            payload: obj
          })
        : dispatch({
            type: INDEX.FILTER_PERSON,
            payload: obj
          });
  };
}

export function getGenre() {
  return dispatch => {
    fetch(API.ROOT +"genre/movie/list?api_key=" +API.KEY +"&language=en-US")
      .then(response => response.json())
      .then(responseJson => {
        data=METHOD.getForPicker(responseJson.genres);
        dispatch({ type: INDEX.GENRES, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}


export function applyFilter(selectedGenre, from=new Date().getFullYear(),to=new Date().getFullYear(),sortBy = "popularity.desc",lang = "en-US", adlt = 'false', video = 'false', page = 1){
  return dispatch => {
    fetch(API.ROOT+"discover/movie?api_key=" +API.KEY +"&language=" +lang +"&sort_by=" +sortBy +"&include_adult=" +adlt +"&include_video=" +video +"&page="+page+"&primary_release_date.gte="+from+"&primary_release_date.lte="+to+"&with_genres="+selectedGenre)
      .then(response => response.json())
      .then(responseJson => {
        data = responseJson.results;
        dispatch({ type: INDEX.FILTER, payload:{data:data, genre:selectedGenre,  from:from,  to:to} });
        Actions.discover();
      })
      .catch(function(error) {
        dispatch({ type: INDEX.ERROR, payload: error });
      });
  };
}