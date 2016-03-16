import React from 'react';
import URL from '../../utils/url';
import { connect } from 'react-redux';
import SummitItem from '../containers/SummitItem';
import GalleryPanel from '../ui/GalleryPanel';
import { fetchSummits } from '../../actions';
import FadeAnimation from '../ui/FadeAnimation';
class Summits extends React.Component {
	
	componentDidMount () {
		if(!this.props.summits.length) {
			this.props.fetchSummits();	
		}
	}

	render () {
		if(this.props.loading) {
			return <div>Loading...</div>
		}
		return (
			<div className="video-app-summit-videos">
				<GalleryPanel className="video-panel">
					<FadeAnimation>
						{this.props.summits.map(summit => (
							<SummitItem key={summit.id} summit={summit} />
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
			summits: state.summits.results,
			loading: state.summits.loading
		}
	},
	dispatch => ({
		fetchSummits () {
			dispatch(fetchSummits());
		}
	})
)(Summits);