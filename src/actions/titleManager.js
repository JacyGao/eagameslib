import {
	ADD_TITLE,
	ENTER_TITLE,
	GET_TITLE,
	LIST_TITLE
} from '../constants/ActionTypes'

export function enterTitle(payload) {
	return {
		type: ENTER_TITLE,
		payload
	}
}

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