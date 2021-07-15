import React from "react"
import './../css/Header.css'

class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header>
                <h1>Animated</h1>
                <input name="q" type="text" placeholder="Search for gif"
                    value={this.props.q}
                    onChange={(event) => this.props.handleChange(event)} />
            </header>
        )
    }
}

export default Header