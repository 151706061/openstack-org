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

export const receiveVideos = createAction('RECEIVE_VIDEOS');

export const requestVideos = () => {
	return (dispatch) => {
		cancel('REQUEST_VIDEOS');
		dispatch({type: 'REQUEST_VIDEOS'});
		const url = URL.create('api/videos');
		const req = http.get(url)
			.end(responseHandler(dispatch, json => {
				dispatch(receiveVideos(json));
			}))
		schedule('REQUEST_VIDEOS', req);
	};
};


/*eslint-enable */