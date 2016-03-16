export const speakers = function (state, action = {}) {
	if(!state) {
		try {
			if(window && window.VideoAppConfig) {
				state = window.VideoAppConfig.initialState.speakers;
			}
		}
		catch (e) {
			state = {
				loading: false,
				results: []
			};
		}
	}

	switch(action.type) {
		case 'REQUEST_SPEAKERS':
			return {
				...state,
				loading: true
			};
		case 'RECEIVE_SPEAKERS':
			return {
				...action.payload.response,
				loading: false
			};

		default:
			return state;
	}
};

