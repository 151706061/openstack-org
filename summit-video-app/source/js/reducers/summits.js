export const summits = function (summits, action) {
	if(!summits) {
		try {
			if(window && window.VideoAppConfig) {
				summits = window.VideoAppConfig.initialState.summits;
			}
		}
		catch (e) {
			summits = [];
		}
	}

	switch(action.type) {
		case 'RECEIVE_SUMMITS':
			return action.payload.sort((a,b) => a.start_date - b.start_date)
								 .map(summit => ({
								 	id: summit.id,
								 	title: summit.name
								 }));
			

		default:
			return summits;
	}
};

