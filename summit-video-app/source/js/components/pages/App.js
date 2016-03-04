import React from 'react';
import NavigationBar from '../containers/NavigationBar';
import LatestUploadPanel from '../containers/LatestUploadPanel';
import VideoSearchForm from '../containers/VideoSearchForm'
class App extends React.Component {

	render () {
		return (
		<div>
			<LatestUploadPanel className="latest-upload" />
			<h2>OpenStack Videos</h2>
			<VideoSearchForm />
			<NavigationBar className="video-navbar" />
			{this.props.children}
		</div>
		);
	}
}

export default App;