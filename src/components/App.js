import React, { Component } from 'react';
import axios from "axios"
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from "./Post/Post.js";
import { toast } from 'react-toastify';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchForPost = this.searchForPost.bind ( this );
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts")
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  searchForPost(text){
    if(text === ""){
      axios.get("https://practiceapi.devmountain.com/api/posts")
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
    }else{
      axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`)
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
    }

  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(response => {
      toast.success("Successful update");
      this.setState({
        posts: response.data
      })
    })
    .catch(error => {
      toast.error("Error updating, error code: ", error);
    })
  
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  render() {
    const { posts } = this.state;
    let renderPosts = this.state.posts.map((post) => {
      return <Post key={post.id} 
      text={post.text} 
      date={post.date}
      id={post.id}
      updatePostFn={this.updatePost}
      deletePostFn={this.deletePost}
      />
    })

    return (
      <div className="App__parent">
        <Header searchPostFn={this.searchForPost}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {renderPosts}
          
        </section>
      </div>
    );
  }
}

export default App;
