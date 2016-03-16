import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import LinkBar from '../ui/LinkBar';
import LinkButton from '../ui/LinkButton';
import URL from '../../utils/url';

const children = [
	<LinkButton link='featured'>Featured & Popular</LinkButton>,
	<LinkButton link=''>All Videos</LinkButton>,
	<LinkButton link='summits'>Summits</LinkButton>,
	<LinkButton link='speakers'>Speakers</LinkButton>,
];
export default connect (
	(state, ownProps) => {
		const activeLink = URL.makeRelative(state.router.location.pathname);
		return {
			className: ownProps.className,
			children,
			activeLink
		}
	},
	dispatch => ({
		onLinkClicked (link) {			
			dispatch(routeActions.push(URL.create(link || '/')));
		}
	})
)(LinkBar);