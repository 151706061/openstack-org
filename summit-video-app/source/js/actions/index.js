/*eslint-disable */
import { responseHandler, cancel, schedule } from '../utils/ajax';
import URL from '../utils/url';
import http from 'superagent';


export const getThreadDetail = (id) => {
	return (dispatch) => {
		cancel('GET_THREAD_DETAIL');
		dispatch(createAction('GET_THREAD_DETAIL'));
		const url = URL.create(`api/v1/thread/${id}`);
		const req = http.get(url)
			.end(responseHandler(dispatch, json => {
				dispatch(receiveThreadDetail(json));
			}))
		schedule('GET_THREAD_DETAIL', req);
	};
};


/*eslint-enable */