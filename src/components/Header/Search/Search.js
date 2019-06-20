import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {

  constructor(props){
    super(props)

    this.state = {
      searchInputText: ""
    }
  }

  handleInput(value){
    if(value === ""){
      this.props.searchPostFn(value)
    }else{
      this.setState({
        searchInputText: value
      })
    }


  }

  searchPosts(){
    this.props.searchPostFn(this.state.searchInputText)
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={(event) => {this.handleInput(event.target.value)}} />

          <SearchIcon id="Search__icon" onClick={() => this.searchPosts()}/>
        </div>
        
      </section>
    )
  }
}