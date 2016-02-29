import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import URL from '../../utils/url';
class App extends React.Component {

	render () {
		return (
		<div>
			<h1>App</h1>
			<a onClick={() => {
				this.props.dispatch(routeActions.push(URL.create('featured')));;
			}}>Featured & Popular</a> | 
			<a onClick={() => {
				this.props.dispatch(routeActions.push(URL.create('')));;
			}}>All videos</a> | 
			<a onClick={() => {
				this.props.dispatch(routeActions.push(URL.create('events')));;
			}}>Events</a> | 
			<a onClick={() => {
				this.props.dispatch(routeActions.push(URL.create('speakers')));;
			}}>Speakers</a>

			{this.props.children}
		</div>
		);
	}
}

export default connect()(App);