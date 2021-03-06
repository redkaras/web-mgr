import {types} from '../constants/ActionTypes'
import {normalize} from 'normalizr'
import {starsArraySchema} from '../constants/Schemas'

export function fetchStars() {
  return dispatch => {
    dispatch(requestStar())

    return fetch('/stars')
      .then(response => response.json()).then(json => {
        const normalized = normalize(json, starsArraySchema);
        dispatch(receiveStars(normalized.entities));
      }).catch(err => {
        throw err
      })
  }
}

function receiveStars(entities) {
  return {
    type: types.RECEIVE_STARS,
    entities
  }
}

function requestStar() {
  return {
    type: types.REQUEST_STARS,
  }
}
