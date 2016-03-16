import React from 'react';
import GalleryPanel from '../ui/GalleryPanel';
import VideoItem from './VideoItem';
import FadeAnimation from '../ui/FadeAnimation';

export const VideoPanel = ({
	title,
	videos
}) => (
	<GalleryPanel title={title} className='video-panel'>
		<FadeAnimation>
			{videos.map(video => (
				<VideoItem key={video.id} video={video} />
			))}
		</FadeAnimation>
	</GalleryPanel>
);

VideoPanel.defaultProps = {
	videos: []
};

export default VideoPanel;