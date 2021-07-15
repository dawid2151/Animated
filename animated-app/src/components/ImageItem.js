import React from "react"
import "./../css/ImageItem.css"

class ImageItem extends React.Component	{
	constructor(props) {
		super(props);
		
	}


	render() {
		let tags = this.props.imageData.tags.map(tag => <p>#{tag}</p>);

		let jsxItem =
			<div id="ImageItem" >
				<img src={this.props.imageData.path} alt="ImageGif" />
				<div id="tagRow">{tags}</div>
			</div>;

		return jsxItem;
	}
}

export default ImageItem