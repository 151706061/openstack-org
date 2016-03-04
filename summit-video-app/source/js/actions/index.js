/*eslint-disable */
import { responseHandler, cancel, schedule } from '../utils/ajax';
import URL from '../utils/url';
import http from 'superagent';


function createAction (type) {
	return function (payload) {
		return {
			type,
			payload
		};
	};
};

function apiURL (segment) {
	return 
}
export const throwError = createAction('THROW_ERROR');

export const clearError = createAction('CLEAR_ERROR');

export const updateSearchText = createAction('UPDATE_SEARCH_TEXT');

export const receiveSummits = createAction('RECEIVE_SUMMITS');

export const requestSummits = () => {
	return (dispatch) => {
		cancel('REQUEST_SUMMITS');
		dispatch({type: 'REQUEST_SUMMITS'});
		const url = URL.create('videos');
		const req = http.get(url)
			.end(responseHandler(dispatch, json => {
				dispatch(receiveSummits(json));
			}))
		schedule('REQUEST_SUMMITS', req);
	};
};


/*eslint-enable */