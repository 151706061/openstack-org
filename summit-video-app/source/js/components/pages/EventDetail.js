import React from 'react';

class EventDetail extends React.Component {

	render () {
		return <h2>Event detail {this.props.params.id}</h2>;
	}
}

export default EventDetail;