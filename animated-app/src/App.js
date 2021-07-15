import React from "react"
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"
import ImageItem from "./components/ImageItem"
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            q: "",
            page: 0
        }
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({ [name]: value, page: 0, images: [] }, () => this.getGifList(this.state.page));
    }

    setNextPage = () => {
        console.log("Setting nextPage...");
        this.setState((prevState) => {
            return { page: prevState.page + 1 };
        }, () => this.getGifList(this.state.page));
    }


    getGifList = (page) => {
        let queryParam = "?q=" + this.state.q;
        let url = "/getgiflist/" + page + queryParam;
        console.log("Getting data from ", url);
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState((prevState) => {
                    return { images: prevState.images.concat(json) };
                });
            });

    }
    componentDidMount() {
        this.getGifList(this.state.page);
    }


    render() {
        return (
            <div className="App">
                <Header
                    handleChange={this.handleChange}
                    q={this.state.q}/>
                <Content
                    imageData={this.state.images}
                    nextPageCallback={this.setNextPage}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
