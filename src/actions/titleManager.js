import {
	ADD_TITLE,
	GET_TITLE,
	LIST_TITLE
} from '../constants/ActionTypes'

export function addTitle(payload) {
	return {
		type: ADD_TITLE,
		payload
	}
}

export function listTitles(payload) {
	return {
		type: LIST_TITLE,
		payload
	}
}

export function getTitle(payload) {
	return {
		type: GET_TITLE,
		payload	
	}
}