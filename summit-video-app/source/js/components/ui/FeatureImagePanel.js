import React from 'react';

class FeatureImagePanel extends React.Component {

	constructor (props) {
		super(props);
		this.handleLinkClicked = this.handleLinkClicked.bind(this);
	}

	handleLinkClicked (e) {
		if(this.props.onLinkClicked) {
			e.preventDefault();
			this.props.onLinkClicked(this.props.link);
		}
	}

	render () {
		const {
			className,
			imageUrl,
			title,
			subtitle,
			link
		} = this.props;

		const autoLink = (el) => {
			return link ? <a href={link} onClick={this.handleLinkClicked}>{el}</a> : el;
		};

		return (
			<div className={className}>
				<div className="feature-image">
					{autoLink(<img src={imageUrl} />)}
				</div>
				<div className="feature-meta">
					<h3>
						{autoLink(title)}
					</h3>
					{subtitle &&
						<h4>{subtitle}</h4>
					}
				</div>
			</div>

		);
	}
}

FeatureImagePanel.PropTypes = {
	imageUrl: React.PropTypes.string,
	title: React.PropTypes.string,
	subtitle: React.PropTypes.string,
	link: React.PropTypes.string,
	onLinkClicked: React.PropTypes.func
};

export default FeatureImagePanel;