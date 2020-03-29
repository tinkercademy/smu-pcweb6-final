import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ShareEntry extends Component {

    constructor(props){
        super(props);
        this.state = {
            entry: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e){
        this.setState({
            entry:e.target.value,
        })
    }

    handleSubmit(e){
        e.preventDefault();
        $("textarea").val('');
        this.props.onAdd(this.state);
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <textarea className="entrybox" onChange={this.handleInput} placeholder="What's on your mind?"></textarea>
                    <div><button className="btn btn-success sharebtn" type="submit">SHARE</button></div>
                </form>
            </div>
        );
    }
}

export default ShareEntry;