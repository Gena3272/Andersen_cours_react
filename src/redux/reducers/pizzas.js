import {SET_LOADED, SET_PIZZAS} from '../constants/constants';

const initialState = {
  items: [],
  isLoaded: false,
};

const pizzas = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_PIZZAS:
      return {
        ...state,
        items: payload,
        isLoaded: true,
      };
    case SET_LOADED:
      return {
        ...state,
        isLoaded: payload,
      };
    default:
      return state;
  }
};

export default pizzas;
