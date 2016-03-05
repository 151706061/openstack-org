import React from 'react';
import NavigationBar from '../containers/NavigationBar';
import LatestUploadPanel from '../containers/LatestUploadPanel';
import VideoSearchForm from '../containers/VideoSearchForm';
import { connect } from 'react-redux';

class App extends React.Component {

	render () {
		return (
		<div>
			{this.props.latestVideo &&
				<LatestUploadPanel video={this.props.latestVideo} />
			}
			{!this.props.latestVideo &&
				<h3>fail</h3>
			}
			<h2>OpenStack Videos</h2>
			{this.props.errorMsg &&
				<div className="error">{this.props.errorMsg}</div>
			}
			<VideoSearchForm />
			<NavigationBar className="video-navbar" />
			{this.props.children}
		</div>
		);
	}
}

export default connect (
	state => ({
		errorMsg: state.errorMsg,
		latestVideo: state.videos.length ? state.videos[0] : null
	})
)(App);