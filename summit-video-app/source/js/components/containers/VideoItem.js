import React from 'react';
import GalleryItem from '../ui/GalleryItem';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import URL from '../../utils/url';

const VideoItem = ({
	video
}) => (
	<GalleryItem
		imageUrl={video.thumbnailURL}
		imageCaption={video.summit.title}
		title={video.title}
		subtitle={video.speakers.map(s => s.name).join(', ')}
		link={URL.create(`show/${video.id}`)}		
	/>
);

export default connect (
	state => ({

	}),
	dispatch => ({
		onItemClicked (link) {
			dispatch(routeActions.push(link));
		}
	})
)(VideoItem);
