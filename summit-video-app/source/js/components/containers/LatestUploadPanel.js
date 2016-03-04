import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import URL from '../../utils/url';
import PreviewImagePanel from '../ui/PreviewImagePanel';

export default connect (
	(state, ownProps) => ({
		className: ownProps.className,
		imageUrl: 'http://lorempixel.com/107/58/',
		title: 'Latest Upload: "Why design matters in open source projects"',
		subtitle: 'February 24, 2016 | Jonathan Bryce',
		link: 'events'
	}),
	dispatch => ({
		onLinkClicked (link) {
			dispatch(routeActions.push(URL.create(link)));
		}
	})
)(PreviewImagePanel);