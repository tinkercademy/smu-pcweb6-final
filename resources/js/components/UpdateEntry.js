import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class UpdateEntry extends Component {

    constructor(props){
        super(props);
        this.state = {
            update: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e){
        this.setState({
            update: e.target.value,
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onEdit(this.state.update);
    }

    render() {
        return (
            <div className='popup'>  
                <div className='popupinner'>
                    <div className="popupBar">
                        <button className="closepopup" onClick={() => this.props.closePopup()}>X</button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="UpdateEntry">Update your entry!</div>   
                        <textarea className="popupText" defaultValue={this.props.text} onChange={this.handleInput}></textarea>  
                        <div><button className="popupUBtn" type="submit">UPDATE</button></div>
                    </form>  
                </div>  
            </div>  
        );
    }
}

export default UpdateEntry;
