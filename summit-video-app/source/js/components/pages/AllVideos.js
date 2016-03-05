import React from 'react';
import URL from '../../utils/url';
import { connect } from 'react-redux';
import VideoItem from '../containers/VideoItem';
import GalleryPanel from '../ui/GalleryPanel';
import moment from 'moment';
import { requestVideos } from '../../actions';

class AllVideos extends React.Component {
	
	componentDidMount () {
		this.props.requestVideos();
	}

	render () {
		const {videos} = this.props;
		const collatedVideos = [];
		let children = [], next;
		
		videos.forEach((video, i) => {
			children.push(video);
			next = i+1;
			if(videos[next] && videos[next].date !== video.date) {
				collatedVideos.push(children);
				children = [];			
			}
		});

		
		let today = moment().format('YYYY-MM-DD');

		return (
			<div className="all-videos">
				{collatedVideos.map((videoSet,i) => {
					let title;
					let {date} = videoSet[0];
					
					if(moment(date).format('YYYY-MM-DD') === today) {
						title = 'Uploaded today';
					}
					else if(moment(date).add(1, 'days').format('YYYY-MM-DD') === today) {
						title = 'Uploaded yesterday';
					}
					else {
						title = 'Uploaded ' + moment(videoSet[0].date).format('MMMM D, YYYY');
					}

					return (
						<GalleryPanel key={i} title={title}>
							{videoSet.map(video => (
								<VideoItem key={video.id} video={video} />
							))}						
						</GalleryPanel>
					);

				})}
			</div>
		);		
	}	
}

export default connect (
	state => {
		return {
			videos: state.videos
		}
	},
	dispatch => ({
		requestVideos () {
			dispatch(requestVideos());
		}
	})
)(AllVideos);