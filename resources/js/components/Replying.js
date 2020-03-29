import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Replying extends Component {

    constructor(props){
        super(props);
        this.state = {
            reply: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e){
        this.setState({
            reply: e.target.value,
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onReply(this.state.reply);
    }


    render() {
        return (
            <div className='popup'>  
                <div className='popupinner'>
                    <div className="popupBar">
                        <button className="closepopup" onClick={() => this.props.closePopup()}>X</button>
                    </div>
                    <div className="entries">
                        <div className="container">
                            <div className="row infobar">
                                <div className="col-6 username">@{this.props.username}</div>
                                <div className="col-6 timestamp">{this.props.postedAt}</div>
                            </div>
                        </div>
                        {this.props.post}
                    </div>

                    <form onSubmit={this.handleSubmit}>  
                        <textarea className="popupText" placeholder="Type a reply!" onChange={this.handleInput}></textarea>  
                        <div><button className="popupRBtn" type="submit">REPLY</button></div>
                    </form>  
                </div>  
            </div>  
        );
    }
}

export default Replying;
