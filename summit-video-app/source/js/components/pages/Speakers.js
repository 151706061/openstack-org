import React from 'react';
import URL from '../../utils/url';
import { connect } from 'react-redux';
import SpeakerItem from '../containers/SpeakerItem';
import GalleryPanel from '../ui/GalleryPanel';
import { fetchSpeakers } from '../../actions';
import FadeAnimation from '../ui/FadeAnimation';
class Speakers extends React.Component {
	
	componentDidMount () {
		if(!this.props.speakers.length) {
			this.props.fetchSpeakers();
		}
	}

	render () {
		if(this.props.loading) {
			return <div>Loading...</div>
		}
		return (
			<div className="video-app-speaker-videos">
				<GalleryPanel className='video-panel'>
					<FadeAnimation>
						{this.props.speakers.map(speaker => (
							<SpeakerItem key={speaker.id} speaker={speaker} />
						))}
					</FadeAnimation>		
				</GalleryPanel>
			</div>
		);		
	}	
}

export default connect (
	state => {
		return {
			loading: state.speakers.loading,
			speakers: state.speakers.results
		}
	},
	dispatch => ({
		fetchSpeakers () {
			dispatch(fetchSpeakers());
		}
	})
)(Speakers);