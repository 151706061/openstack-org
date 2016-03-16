import React from 'react';
import URL from '../../utils/url';
import { connect } from 'react-redux';
import VideoItem from '../containers/VideoItem';
import VideoPanel from '../containers/VideoPanel';
import { fetchSearchVideos, updateSearchText } from '../../actions';

class Search extends React.Component {
	
	componentDidMount () {
		this.props.requestVideos(this.props.searchTerm);
		this.props.updateSearchText(this.props.searchTerm);
	}

	componentWillReceiveProps (nextProps) {
		if(nextProps.searchTerm !== this.props.searchTerm) {
			this.props.requestVideos(nextProps.searchTerm);
		}
	}

	render () {
		if(this.props.loading || !this.props.videos) {
			return <div>Loading...</div>
		}

		const term = this.props.searchTerm;
		const {
			titleMatches,
			speakerMatches,
			topicMatches
		} = this.props.videos;

		return (
			<div>
				{titleMatches && titleMatches.length > 0 &&
					<VideoPanel 
						title={`Videos matching title "${term}"`}
						videos={titleMatches}
					 />
				}
				{speakerMatches && speakerMatches.length > 0 &&
					<VideoPanel 
						title={`Videos matching speakers named "${term}"`} 
						videos={speakerMatches}
					 />
				}
				{topicMatches && topicMatches.length > 0 &&
					<VideoPanel 
						title={`Videos matching topic "${term}"`}
						videos={topicMatches}
					 />
				}
			</div>
		);
	}
}

export default connect (
	state => {
		const {searchVideos} = state.videos;
		return {
			loading: searchVideos.loading,
			videos: searchVideos.results,
			searchTerm: state.router.location.query.search
		}
	},
	(dispatch, ownProps) => ({
		requestVideos (term) {
			dispatch(fetchSearchVideos(term));
		},
		updateSearchText (term) {
			dispatch(updateSearchText(term));
		}
	})
)(Search);