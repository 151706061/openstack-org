import React from 'react';

export default (requiredType, componentName) => {
	return function (props, propName, componentName) {
		const prop = props[propName];
		let good = true;
		React.Children.forEach(prop, child => {
			good = good && (child.type.name === requiredType);
		});

		if(!good) {
			return new Error (
				`${componentName} requires children of only type ${requiredType}`
			);
		}
	};
};