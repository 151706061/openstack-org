import React from 'react';
import { connect } from 'react-redux';
import { fetchSummitVideos } from '../../actions';
import DateGroupedVideoList from '../views/DateGroupedVideoList';
import RouterLink from '../containers/RouterLink';

class SummitDetail extends React.Component {

	componentDidMount () {
		const {summit} = this.props.videos;

		if(!summit || summit.id != this.props.params.id) {
			this.props.requestVideos();	
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.params.id !== this.props.params.id) {
			this.props.requestVideos();
		}
	}

	render () {
		if(this.props.loading) {
			return <h2>loading...</h2>
		}
		return (
			<div>
				{this.props.summit &&
				<div>
					<h2>{this.props.summit.title}</h2>
					<h4><RouterLink link='summits'>All summits</RouterLink></h4>
				</div>
				}
				<DateGroupedVideoList videos={this.props.videos} />
			</div>
		);
	}
}

export default connect (
	(state, ownProps) => {
		return {
			summit: state.videos.summitVideos.summit,
			videos: state.videos.summitVideos.results,
			loading: state.videos.loading
		}
	},
	(dispatch, ownProps) => {
		return {
			requestVideos () {
				dispatch(fetchSummitVideos(ownProps.params.id));
			}
		}
	}
)(SummitDetail);