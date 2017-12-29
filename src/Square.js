import React, {Component} from 'react';
import "./Square.css";

/**
 * Square Component
 */
class Square extends Component {
    constructor(props, context, updater) {
        super(props, context, updater);
        const size = this.calcSize(window.innerWidth);
        this.state = {
            width: (100 / 3) + '%',
            height: size,
            fontSize: size,
            color: null
        };
        window.addEventListener('resize', (e) => {
            const size = this.calcSize(e.currentTarget.innerWidth);
            this.setState({
                height: size,
                fontSize: size
            });
        });
    }
    calcSize(width) {
        return (width / 3) - 15;
    }
    getColor(player) {
        return player && player === 'X' ? '#311B92' : '#F44336';
    }
    componentWillReceiveProps(props) {
        if (props.value !== this.state.value) {
            this.setState({
                value: props.value,
                color: this.getColor(props.value)
            });
        }
    }
    render() {
        return (
            <button className="square" style={this.state} onClick={() => this.props.onClick()}>
                {this.state.value}
            </button>
        );
    }
}

export default Square;