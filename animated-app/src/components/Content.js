import React from "react"
import "./../css/Content.css"
import ImageItem from "./ImageItem"

class Content extends React.Component {
    constructor(props) {
        super(props);



    }

    //this.props.getGifList(page);
    handleScroll = (event) => {
        let element = event.target;
        let isAtEnd = element.scrollHeight - Math.abs(element.scrollTop) === element.clientHeight;
        if (isAtEnd) {
            console.log("At end of scroll");
            this.props.nextPageCallback();
        }
    }

    render() {
        console.log("JSX before rendering:", this.props.imageData);
        let imageItems = this.props.imageData.map(image =>
            <ImageItem imageData={image} />);

        return (
            <div id="content" onScroll={this.handleScroll}>
                {imageItems}

            </div>)
    }
}

export default Content