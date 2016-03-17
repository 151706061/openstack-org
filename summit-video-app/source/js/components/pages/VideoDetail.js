import React from 'react';
import { connect } from 'react-redux';
import { fetchVideoDetail } from '../../actions';

class VideoDetail extends React.Component {

	componentDidMount () {
		if(!this.props.video || this.props.video.id != this.props.params.id) {
			this.props.fetchVideoDetail();
		}
	}

	componentWillReceiveProps (nextProps) {
		if(!this.props.video || nextProps.video.id != nextProps.params.id) {
			this.props.fetchVideoDetail();
		}		
	}

	render () {
		const {video} = this.props;
		if(!video) {
			return <div>Loading...</div>
		}

		return (
			<div className="video-detail">
				<h2>{video.title}</h2>
				<h3>{video.speakers.map(s => s.name).join(', ')}</h3>
				<h4>{video.summit.title}</h4>
				<div className="video-embed">
					<iframe 
						width={420} 
						height={315} 
						src={`https://www.youtube.com/embed/${video.youtubeID}`} 
						frameBorder={0}
						allowFullScreen
					 />
				</div>
			</div>
		);
	}
}

export default connect (
	state => {
		console.log(state);
		return {
			video: state.videoDetail.video
		}
	},
	(dispatch, ownProps) => ({
		fetchVideoDetail () {			
			dispatch(fetchVideoDetail(ownProps.params.id));
		}
	})
)(VideoDetail);