export const videos = function (videos, action) {
	if(!videos) {
		try {
			if(window && window.VideoAppConfig) {
				videos = window.VideoAppConfig.initialState.videos;
			}
		}
		catch (e) {
			videos = [];
		}
	}

	switch(action.type) {
		case 'RECEIVE_VIDEOS':
			return action.payload			
		default:
			return videos;
	}
};

