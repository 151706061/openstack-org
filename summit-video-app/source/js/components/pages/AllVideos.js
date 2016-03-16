import React from 'react';
import URL from '../../utils/url';
import { connect } from 'react-redux';
import VideoItem from '../containers/VideoItem';
import GalleryPanel from '../ui/GalleryPanel';
import moment from 'moment';
import DateGroupedVideoList from '../views/DateGroupedVideoList';
import { fetchAllVideos } from '../../actions';

class AllVideos extends React.Component {
	
	componentDidMount () {
		if(!this.props.videos.length) {
			this.props.fetchVideos();			
		}
	}

	render () {
		if(this.props.loading) {
			return <div>Loading...</div>
		}
		
		return <DateGroupedVideoList videos={this.props.videos} />
	}
}

export default connect (
	state => {
		const {allVideos} = state.videos;
		return {
			loading: allVideos.loading,
			videos: allVideos.results
		}
	},
	dispatch => ({
		fetchVideos () {
			dispatch(fetchAllVideos());
		}
	})
)(AllVideos);