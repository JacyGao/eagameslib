import {
	ADD_TITLE,
	GET_TITLE,
	LIST_TITLE
} from '../constants/ActionTypes'

const initialState = {
  title: "",
  error: "",
  titles: [],
  searchTerm: "",
}

export default function titleManager(state = initialState, action) {
  	switch (action.type) {
    	case LIST_TITLE:
			    return Object.assign({}, state, {titles: action.payload})
  		case ADD_TITLE:
      		return Object.assign({}, state, {error: action.payload, title:"", searchTerm:""})
      case GET_TITLE:
          return Object.assign({}, state, {searchTerm: action.payload, title:action.payload, error:""})
	    default:
      		return Object.assign({}, state)
	}
}