import React from 'react';
import URL from '../../utils/url';
import { connect } from 'react-redux';
import GalleryItem from '../ui/GalleryItem';
import GalleryPanel from '../ui/GalleryPanel';

const AllVideos = ({
	videos,
	handleVideoClick
}) => {		
	const collatedVideos = [];
	videos = videos.sort((a, b) => a.date > b.date ? -1 : 1);

	let children = [], next;
	videos.forEach((video, i) => {
		children.push(video);
		next = i+1;
		if(videos[next] && videos[next].date !== video.date) {
			collatedVideos.push(children);
			children = [];			
		}
	});

	return (
		<div className="all-videos">
			{collatedVideos.map(videoSet => {				
				let title = videoSet[0].date;
				return (
					<GalleryPanel key={title} title={title}>
						{videoSet.map(video => (
							<GalleryItem
								key={video.id}
								imageUrl={video.image}
								imageCaption={video.summit.title}
								title={video.title}
								subtitle={video.speaker.name}
								link={URL.create(`show/${video.id}`)}
								onItemClicked={handleVideoClick}
							/>
						))}
					</GalleryPanel>
				);

			})}
		</div>
	);
}

export default connect (
	state => ({
		videos: state.videos
	}),
	dispatch => ({
		handleVideoClick (link) {
			dispatch(routeActions.push(link));
		}
	})
)(AllVideos);