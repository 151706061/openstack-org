export const allVideos = (
	state = { 
		results: [],
		loading: false
	}, 
	action = {}
) => {
	switch(action.type) {
		case 'REQUEST_ALL_VIDEOS':
			return {
				...state,
				loading: true
			};
		case 'RECEIVE_ALL_VIDEOS':			
			return {
				results: [...action.payload.response.results],
				loading: false
			}

		default:
			return state			
	}
};

export const summitVideos = (
	state = {
		summit: null, 
		loading: false,
		results: []
	}, 
	action = {}
) => {
	switch(action.type) {
		case 'REQUEST_SUMMIT_VIDEOS':
			if( (action.payload.summit && !state.summit) ||
				(state.summit && state.summit.id !== action.payload.summit)
			) {
				return {
					summit: null,
					results: [],
					loading: true
				};
			}
			return {
				...state,
				loading: true
			};

		case 'RECEIVE_SUMMIT_VIDEOS':
			return {
				summit: {
					...action.payload.response.summit
				},
				results: [
					...action.payload.response.results
				],
				loading: false
			};

		default:
			return state			

	}
}

export const speakerVideos = (
	state = {
		speaker: null,
		results: [],
		loading: false
	},
	action = {}
) => {
	switch(action.type) {
		case 'REQUEST_SPEAKER_VIDEOS':
			if( (action.payload.speaker && !state.speaker) ||
				(state.speaker && state.speaker.id !== action.payload.speaker)
			) {
				return {
					speaker: null,
					results: [],
					loading: true
				};
			}
			return {
				...state,
				loading: true
			};

		case 'RECEIVE_SPEAKER_VIDEOS':
			return {
				speaker: {
					...action.payload.response.speaker
				},
				results: [
					...action.payload.response.results
				],				
				loading: false
			};

		default:
			return state			

	}
};

export const highlightedVideos = (
	state = {
		results: [],
		loading: false
	},
	action = {}
) => {
	switch(action.type) {
		case 'REQUEST_HIGHLIGHT_VIDEOS':
			return {
				...state,
				loading: true
			}

		case 'RECEIVE_HIGHLIGHT_VIDEOS':		
			return {
				results: [...action.payload.response.results],
				loading: false
			};

		default:
			return state;
	}
};	


export const popularVideos = (
	state = {
		results: [],
		loading: false
	},
	action = {}
) => {
	switch(action.type) {
		case 'REQUEST_POPULAR_VIDEOS':
			return {
				...state,
				loading: true
			}

		case 'RECEIVE_POPULAR_VIDEOS':
			return {
				results: [...action.payload.response.results],
				loading: false
			};

		default:
			return state;
	}
};	


export const searchVideos = (
	state = {
		results: null,
		loading: false
	},
	action = {}
) => {	
	switch(action.type) {
		case 'REQUEST_SEARCH_VIDEOS':		
			return {
				results: null,
				loading: true
			};

		case 'RECEIVE_SEARCH_VIDEOS':		
			return {
				results: {
					...action.payload.response.results	
				},
				loading: false
			}
		
		default:
			return state
	}
}