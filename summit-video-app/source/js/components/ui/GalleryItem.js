import React from 'react';

class GalleryItem extends React.Component {

	constructor (props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick (e) {
		if(this.props.onItemClicked) {		
			e.preventDefault();
			return this.props.onItemClicked(this.props.link);
		}
	}

	render () {
		let {
			className,
			imageUrl,
			imageCaption,
			title,
			subtitle,
			link
		} = this.props;

		const autoLink = (el) => {
			return link ? <a href={link} onClick={this.handleClick}>{el}</a> : el;
		};

		return (
			<div className={className}>
				<div className="gallery-image">
					{autoLink(<img src={imageUrl} />)}
					<div className="gallery-image-caption">
						{autoLink(imageCaption)}
					</div>
				</div>
				<div className="gallery-title">
					{autoLink(title)}
				</div>
				{subtitle &&
				<div className="gallery-subtitle">
					{subtitle}
				</div>	
				}
			</div>
		);
	}
}

GalleryItem.propTypes = {
	imageUrl: React.PropTypes.string,
	imageCaption: React.PropTypes.string,
	title: React.PropTypes.string,
	subtitle: React.PropTypes.string,
	link: React.PropTypes.string,
	onItemClicked: React.PropTypes.func
};

export default GalleryItem;