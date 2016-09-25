import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import reducers from '../src/reducers/index'
import TitleManager from '../src/containers/TitleManager'

const createStore = (reducer) => {
	let state;
	let listeners = [];

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach(listener => listener());
	}

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	};
	dispatch({});

	return { getState, dispatch, subscribe };
};

const store = createStore(reducers);
const render = () => {
	ReactDOM.render(
		<TitleManager store = {store}/>,
		document.getElementById('app')
	)
}
render();