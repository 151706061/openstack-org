import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import LinkBar from '../ui/LinkBar';
import LinkButton from '../ui/LinkButton';
import URL from '../../utils/url';

const children = [
	<LinkButton link='featured'>Featured & Popular</LinkButton>,
	<LinkButton link='/'>All Videos</LinkButton>,
	<LinkButton link='events'>Events</LinkButton>,
	<LinkButton link='speakers'>Speakers</LinkButton>,
];
export default connect (
	(state, ownProps) => {
		console.log(state.router.location.pathname, URL.makeRelative(state.router.location.pathname));
		return {
		className: ownProps.className,
		children,
		activeLink: URL.makeRelative(state.router.location.pathname)
		}
	},
	dispatch => ({
		onLinkClicked (link) {
			dispatch(routeActions.push(URL.create(link)));
		}
	})
)(LinkBar);