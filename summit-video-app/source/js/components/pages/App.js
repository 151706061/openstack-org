import React from 'react';
import NavigationBar from '../containers/NavigationBar';
import LatestUploadPanel from '../containers/LatestUploadPanel';
import VideoSearchForm from '../containers/VideoSearchForm';
import { fetchLatestVideo } from '../../actions';
import { connect } from 'react-redux';
class App extends React.Component {

	componentDidMount () {
		this.props.fetchLatestVideo();
	}

	render () {
		return (
		<div>
			<div className="video-app-latest">
				{this.props.loading &&
					<div>Loading...</div>
				}
				{this.props.latestVideo && !this.props.loading &&
					<LatestUploadPanel video={this.props.latestVideo} />
				}
			</div>
			<h2>OpenStack Videos</h2>
			{this.props.errorMsg &&
				<div className="error">{this.props.errorMsg}</div>
			}
			<VideoSearchForm />
			<NavigationBar className="video-navbar" />
			<div className="video-app-layout">				
				{this.props.children}				
			</div>
		</div>
		);
	}
}

export default connect (
	state => {
		const {latestVideo} = state.video;
		return {
			errorMsg: state.errorMsg,
			latestVideo: latestVideo,
			loading: latestVideo && latestVideo.loading
		}
	},
	dispatch => ({
		fetchLatestVideo () {
			dispatch(fetchLatestVideo())
		}
	})
)(App);