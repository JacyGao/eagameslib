import {
	ADD_TITLE,
	ENTER_TITLE,
	GET_TITLE,
	LIST_TITLE
} from '../constants/ActionTypes'

const initialState = {
  title: "",
  error: "",
  titles: [],
}

export default function titleManager(state = initialState, action) {
  	switch (action.type) {
    	case LIST_TITLE:
			return Object.assign({}, state, {titles: action.payload})
        case ENTER_TITLE:
      		return Object.assign({}, state, {title: action.payload})
  		case ADD_TITLE:
      		return Object.assign({}, state, {error: action.payload})
	    default:
      		return Object.assign({}, state)
	}
}