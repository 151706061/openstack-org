import React from 'react';
import NavigationBar from '../containers/NavigationBar';
import LatestUploadPanel from '../containers/LatestUploadPanel';
import VideoSearchForm from '../containers/VideoSearchForm';
import { fetchLatestVideo } from '../../actions';
import { connect } from 'react-redux';
import Animate from 'react-addons-css-transition-group';

class App extends React.Component {

	componentDidMount () {
		this.props.fetchLatestVideo();

		if(window.VideoAppConfig.pollInterval) {
			this._interval = window.setInterval(() => {
				this.props.fetchLatestVideo();
			}, window.VideoAppConfig.pollInterval);			
		}
	}

	comoonentWillUnmount () {		
		this._interval && window.clearInterval(this._interval);
	}

	render () {
		return (
		<div>
			<div className="video-app-latest">
				{this.props.loading && !this.props.latestVideo &&
					<div>Loading...</div>
				}
				{this.props.latestVideo &&
				<Animate transitionName="vertical-flip" transitionEnterTimeout={1000} transitionLeave={false}>
					<LatestUploadPanel key={this.props.latestVideo.id} video={this.props.latestVideo} />
				</Animate>
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