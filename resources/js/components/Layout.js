import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ShareEntry from './ShareEntry';
import UpdateEntry from './UpdateEntry';
import Replying from './Replying';
import axios from 'axios';

export default class Layout extends Component {

    constructor(){
        super();
        this.state={
            entries: [],
            replies: [],
            results: [],
            currentuser: '',
            query: '',
            showPopup: false,
            showReply: false,
            showReplyParent: false,
            showEditPT: false,
            showEditReply: false,
            tweetBeingReplied: null,
            editingEntry: null,
            notReplying: true,
            isSearching: false,
            isReplying: false,
            replyingTo: []
        };

        this.handleAddPost = this.handleAddPost.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteReply = this.handleDeleteReply.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditPT = this.handleEditPT.bind(this);
        this.handleEditReply = this.handleEditReply.bind(this);
        this.showPopup = this.showPopup.bind(this);
        this.showReply = this.showReply.bind(this);
        this.showReplyParent = this.showReplyParent.bind(this);
        this.showEditPT = this.showEditPT.bind(this);
        this.showEditReply = this.showEditReply.bind(this);
        this.handleReply = this.handleReply.bind(this);
        this.handleReplyParent = this.handleReplyParent.bind(this);
        this.loadReplies = this.loadReplies.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleQuery = this.handleQuery.bind(this);

    }

    componentDidMount(){
        fetch('/homepage/posts')
            .then(response => {
                return response.json();
            })
            .then(entries => {
                this.setState({entries: entries});
            })
    }


    handleDelete(post, username){
        axios.post('/homepage/delete', {
            id: post,
            username: username
        })
        .then( res => {
            this.setState({
                entries: res.data
            })
        });
    }

    CurrentUser(){
        axios.post('/homepage/currentuser', {
        })
        .then( res => {
            this.setState({
                currentuser: res.data
            })
        });
    }

    handleDeleteParent(post, username){
        axios.post('/homepage/delete', {
            id: post,
            username: username
        })
        .then( res => {
            this.setState({
                entries: res.data,
                isReplying: !this.state.isReplying
            })
        });
    }

    handleDeleteReply(post, username, parent){
        axios.post('/homepage/deleteReply', {
            id: post,
            username: username,
            parentID: parent
        })
        .then( res => {
            this.setState({
                replies: res.data,
            })
        });

        axios.post('/tweet/tweetID', {
            id: parent
        })
        .then( res => {
            this.setState({
                replyingTo: res.data
            })
        });
    }

    handleAddPost(newentry){
        axios.post('/homepage/posts', {
            entry: newentry.entry
        })
        .then( res => {
            this.setState({
                entries: res.data
            })
        });

    }

    handleEdit(update){
        axios.post('/homepage/update', {
            entry: update,
            id: this.state.editingEntry.id,
            username: this.state.editingEntry.username
        })
        .then( res => {
            this.setState({
                entries: res.data,
                showPopup: !this.state.showPopup
            })
        });
    }

    handleEditPT(update){
        axios.post('/homepage/updatePT', {
            entry: update,
            id: this.state.editingEntry.id,
            username: this.state.editingEntry.username
        })
        .then( res => {
            this.setState({
                replyingTo: res.data,
                showEditPT: !this.state.showEditPT
            })
        });
    }

    handleEditReply(update){
        axios.post('/homepage/updateReply', {
            entry: update,
            id: this.state.editingEntry.id,
            parentID: this.state.editingEntry.parentTweetId,
            username: this.state.editingEntry.username
        })
        .then( res => {
            this.setState({
                replies: res.data,
                showEditReply: !this.state.showEditReply
            })
        });
    }

    handleReply(reply){
        axios.post('/homepage/reply', {
            entry: reply,
            id: this.state.tweetBeingReplied.id,
        })
        .then( res => {
            this.setState({
                entries: res.data,
                showReply: !this.state.showReply
            })
        });
    }

    handleReplyParent(reply){
        axios.post('/homepage/replyParent', {
            entry: reply,
            id: this.state.tweetBeingReplied.id,
        })
        .then( res => {
            this.setState({
                replies: res.data,
                showReplyParent: !this.state.showReplyParent
            })
        });

        axios.post('/tweet/tweetID', {
            id: this.state.tweetBeingReplied.id
        })
        .then( res => {
            this.setState({
                replyingTo: res.data
            })
        });
    }

    handleQuery(e){
        this.setState({
            query: e.target.value,
        })
    }

    handleSearch(e){
        window.history.pushState("string", "searching", "/search")
        e.preventDefault();
        axios.post('/search', {
            data: this.state.query
        })        
        .then( res => {
            this.setState({
                results: res.data,
                isSearching: true,
            })
        });
    }

    showReply(selectedTweet) {
        this.setState({  
        showReply: !this.state.showReply,
        tweetBeingReplied: selectedTweet  
        });
    }

    showReplyParent(selectedTweet) {
        this.setState({  
        showReplyParent: !this.state.showReplyParent,
        tweetBeingReplied: selectedTweet  
        });
    }

    showPopup(selectedEntry) {
        this.setState({  
        showPopup: !this.state.showPopup,
        editingEntry: selectedEntry  
        });
    }

    showEditPT(selectedEntry) {
        this.setState({  
        showEditPT: !this.state.showEditPT,
        editingEntry: selectedEntry  
        });
    }

    showEditReply(selectedEntry) {
        this.setState({  
        showEditReply: !this.state.showEditReply,
        editingEntry: selectedEntry  
        });
    }

    backToPrevious(){
        window.history.back()
        this.setState({
            isSearching: false,
        })
    }

    backToHome(){
        window.history.pushState("string", "backhome", "/homepage")
        this.setState({
            isReplying: false
        })

        fetch('/homepage/posts')
            .then(response => {
                return response.json();
            })
            .then(entries => {
                this.setState({entries: entries});
            })
    }

    loadReplies(tweet){
        window.history.pushState("string", "tweetID", `/tweet/${tweet.id}`)
        axios.post('/tweet', {
            id: tweet.id
        })
        .then( res => {
            this.setState({
                replies: res.data,
                isReplying: true,
                replyingTo: tweet
            })
        });
    }

    renderResults(){
        return this.state.results.map(posts => {
            if(posts.postedAt == null){
                return(
                    <div>
                        <h1>No results found!</h1>
                    </div>
                );
            }else{
                return(
                    <div>                 
                        <div className="entries" key={posts.id} >
                            <div className="container">
                                <div className="row infobar">
                                    <div className="col-6 username">@{posts.username}</div>
                                    <div className="col-6 timestamp">{posts.postedAt}</div>
                                </div>
                            </div>
                                {posts.entry}
                        </div>
                    </div>
                );
            }
        })
    }

    renderEntries(){
        return this.state.entries.map(posts => {

            if(posts.isReply == 0){
                let RC;
                let bottombar;
                if(posts.numberOfReplies > 0){
                    RC = <span className="repliesCount"  onClick={() => this.loadReplies(posts)}>{posts.numberOfReplies}</span>
                }

                if(posts.username == this.state.currentuser){
                    bottombar = <div className="row">
                                    <div className="col-8">
                                        <button className="replyBtn" onClick={() => this.showReply(posts)}><i className="fas fa-comment"></i></button>
                                        {RC}
                                    </div>
                                    <div className="col-2">
                                        <button className="delBtn" onClick={() => this.handleDelete(posts.id, posts.username)}><i className="fas fa-trash-alt"></i></button>
                                    </div>
                                    <div className="col-2">
                                        <button className="editBtn" onClick={() => this.showPopup(posts)}><i className="fas fa-pencil-alt"></i></button>
                                    </div>
                                </div>
                }else{
                    bottombar = <div>
                                    <button className="replyBtnFlushed" onClick={() => this.showReply(posts)}><i className="fas fa-comment"></i></button>
                                    {RC}
                                </div>
                }
                return(
                    <div className="entries" key={posts.id} >
                        <div className="container">
                            <div className="row infobar">
                                <div className="col-6 username">@{posts.username}</div>
                                <div className="col-6 timestamp">{posts.postedAt}</div>
                            </div>
                        </div>
                            {posts.entry}
                        
                            {bottombar}

                        <div>
                        {this.state.showPopup ?  
                            <UpdateEntry    
                                onEdit={this.handleEdit}
                                text={this.state.editingEntry.entry}
                                closePopup={this.showPopup}
                            />  
                            : null  
                        }

                        {this.state.showReply ?  
                            <Replying 
                                onReply={this.handleReply}
                                username={this.state.tweetBeingReplied.username}
                                postedAt={this.state.tweetBeingReplied.postedAt}
                                post={this.state.tweetBeingReplied.entry}
                                closePopup={this.showReply}  
                            />  
                            : null  
                        }
                        </div>
                    </div>
                );
            }
        })
    }

    renderReplies(){
        return this.state.replies.map(posts => {

            let D;
            let E;
            if(posts.username == this.state.currentuser){
                    D = <button className="delreplyBtn" onClick={() => this.handleDeleteReply(posts.id, posts.username, posts.parentTweetId)}><i className="fas fa-trash-alt"></i></button>
                    E = <button className="editreplyBtn" onClick={() => this.showEditReply(posts)}><i className="fas fa-pencil-alt"></i></button>
                }
            return(
                <div>                 
                    <div className="entries" key={posts.id} >
                        <div className="container">
                            <div className="row infobar">
                                <div className="col-6 username">@{posts.username}</div>
                                <div className="col-6 timestamp">{posts.postedAt}</div>
                            </div>
                        </div>
                            {posts.entry}
                        <div>
                            {E}
                            {D}
                        </div>

                        <div>
                            {this.state.showEditPT ?  
                                <UpdateEntry    
                                    onEdit={this.handleEditPT}
                                    text={this.state.editingEntry.entry}
                                    closePopup={this.showEditPT}
                                />  
                                : null  
                            }

                            {this.state.showEditReply ?  
                                <UpdateEntry    
                                    onEdit={this.handleEditReply}
                                    text={this.state.editingEntry.entry}
                                    closePopup={this.showEditReply}
                                />  
                                : null  
                            }


                            {this.state.showReplyParent ?  
                                <Replying 
                                    onReply={this.handleReplyParent}
                                    username={this.state.tweetBeingReplied.username}
                                    postedAt={this.state.tweetBeingReplied.postedAt}
                                    post={this.state.tweetBeingReplied.entry}
                                    closePopup={this.showReplyParent}  
                                />  
                                : null  
                            }

                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        {this.CurrentUser() }
        if(this.state.isSearching){
            return (
                <div className="container">
                    <div className="row mainbody">
                        <div className="col-3">
                        <span className="previousbtn"  onClick={() => this.backToPrevious()}><i className="fas fa-arrow-left"></i></span>
                        </div>
                        <div className="col-6">                            
                            {this.renderResults() }
                        </div>
                        <div className="col-3">
                            <form onSubmit = {this.handleSearch}>
                                <input type="text" onChange={this.handleQuery} placeholder="Search" required/>
                                <button className="btn btn-success" type="submit">
                                    <span>
                                        <i className="fas fa-search"></i>
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }else if(this.state.isReplying){
            let bottombar;

            if(this.state.replyingTo.username == this.state.currentuser){
                bottombar = <div className="row">
                                <div className="col-8">
                                    <button className="replyBtn" onClick={() => this.showReplyParent(this.state.replyingTo)}><i className="fas fa-comment"></i></button>
                                    <span className="PTrepliesCount">{this.state.replyingTo.numberOfReplies}</span>
                                </div>
                                <div className="col-2">
                                    <button className="delBtn" onClick={() => this.handleDeleteParent(this.state.replyingTo.id, this.state.replyingTo.username)}><i className="fas fa-trash-alt"></i></button>
                                </div>
                                <div className="col-2">
                                    <button className="editBtn" onClick={() => this.showEditPT(this.state.replyingTo)}><i className="fas fa-pencil-alt"></i></button>
                                </div>
                            </div>
            }else{
                bottombar = <div>
                                <button className="replyBtnFlushed" onClick={() => this.showReplyParent(this.state.replyingTo)}><i className="fas fa-comment"></i></button>
                                <span className="PTrepliesCount">{this.state.replyingTo.numberOfReplies}</span>
                            </div>
            }

            if(this.state.replyingTo.numberOfReplies == 0){
                {this.backToHome()}
            }
            return (
                <div className="container">
                    <div className="row mainbody">
                        <div className="col-3">
                            <span className="previousbtn"  onClick={() => this.backToHome()}><i className="fas fa-arrow-left"></i></span>
                        </div>
                        <div className="col-6">
                            <div className="ParentTweet" key={this.state.replyingTo.id} >
                                <div className="container">
                                    <div className="row infobar">
                                        <div className="col-6 username">@{this.state.replyingTo.username}</div>
                                        <div className="col-6 timestamp">{this.state.replyingTo.postedAt}</div>
                                    </div>
                                </div>
                                    {this.state.replyingTo.entry}
                                    {bottombar}
                            </div>
                                {this.renderReplies() }
                        </div>
                        <div className="col-3">
                            <form onSubmit = {this.handleSearch}>
                                <input type="text" onChange={this.handleQuery} placeholder="Search" required/>
                                <button className="btn btn-success" type="submit">
                                    <span>
                                        <i className="fas fa-search"></i>
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }else if(this.state.notReplying){
            return (
                <div className="container">
                    <div>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6 sharebox container">
                                <ShareEntry onAdd={this.handleAddPost} />
                            </div>
                            <div className="col-3 searchbar">
                                <form onSubmit = {this.handleSearch}>
                                    <input type="text" onChange={this.handleQuery} placeholder="Search" required/>
                                    <button className="btn btn-success" type="submit">
                                        <span>
                                            <i className="fas fa-search"></i>
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row mainbody">
                        <div className="col"></div>
                        <div className="col-6">
                                {this.renderEntries() }
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            );
        }
    }
}

if (document.getElementById('layout')) {
    ReactDOM.render(<Layout />, document.getElementById('layout'));
}
