import React, {Component} from 'react';
import "./Modal.css";

/**
 * Modal Component
 */
class Modal extends Component {
    constructor(props, context, updater) {
        super(props, context, updater);
        this.state = {
            level: props.level || 6
        };
        this.handleBackdropClick = this.handleBackdropClick.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
    }
    componentDidMount() {
        this.hide();
    }
    show() {
        this.setState({
            status: 'show',
            style: {
                display: 'flex',
                visibility: 'visible',
                opacity: 1,
            }
        });
    }
    hide() {
        this.setState({
            status: 'hide',
            style: {
                display: 'none',
                visibility: 'hidden',
                opacity: 0,
            }
        });
    }
    handleBackdropClick() {
        if (this.state.status === 'show') {
            this.hide();
        } else if (this.state.status === 'hide') {
            this.show();
        }
    }
    handleAccept(e) {
        if (this.props.onAccept) {
            this.props.onAccept(this.state.level, e);
        }
        this.hide();
    }
    render() {
        const level = (
            <select id="level" className="form-control" value={this.state.level} onChange={(e) => {
                this.setState({
                    level: e.target.value
                });
            }}>
                <option value={3}>Very easy</option>
                <option value={4}>Easy</option>
                <option value={6}>Normal</option>
                <option value={7}>Hard</option>
                <option value={9}>Very Hard</option>
                <option value={10}>Insane</option>
            </select>
        );
        return (
            <div className="modal-backdrop" style={this.state.style} onClick={this.handleBackdropClick}>
                <div className="modal" onClick={(e) => {e.stopPropagation()}}>
                    <div className="modal-header">
                        <strong>New Game</strong>
                    </div>
                    <div className="modal-content">
                        <label className="form-label">Computer level</label>
                        {level}
                    </div>
                    <div className="modal-footer">
                        <button className="btn-flat btn-default" onClick={() => this.hide()}>Cancel</button>
                        <button className="btn-flat btn-default" onClick={this.handleAccept}>Accept</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;