import React from 'react';

class SpeakerDetail extends React.Component {

	render () {
		return <h2>Speaker detail {this.props.params.id}</h2>;
	}
}

export default SpeakerDetail;