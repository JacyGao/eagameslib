import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addTitle, listTitles, getTitle } from '../actions/TitleManager'
import { LIST_TITLE } from '../config'
import 'whatwg-fetch'
import SearchInput, {createFilter} from 'react-search-input'

const KEYS_TO_FILTERS = ['title']

class TitleManager extends Component{
	componentDidMount() {
		fetch(LIST_TITLE)
		  .then(response => response.json())
		  .then(data => {
		  	this.props.listTitles(data.Body);
		  })
          .catch(err => {
            console.log(err);
            return undefined;
          })
	}
	onSubmit() {
		fetch(LIST_TITLE, {
            method: 'POST',
            body: JSON.stringify({"title":this.props.store.titleManager.title})
      	})
      	.then(response => response.json())
		.then(data => {
			if(data.Success) {
				this.props.store.titleManager.titles.push(data.Body);
			}
			this.props.addTitle(data.Error);
      	})
      	.catch(err => {
        console.log(err);
        return undefined;
      	})
	}
	searchUpdated (term) {
    	this.props.getTitle(term);
  	}
	render() {
		var searchTerm = this.props.store.titleManager.searchTerm;
		var titles = this.props.store.titleManager.titles;
		var error = this.props.store.titleManager.error;
		var title = this.props.store.titleManager.title;
		console.log(this.props);
		const filteredTitle = titles.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
		return (
			<div>
				<div className="app_header">EA Games Library</div>
				<div className="app_error">{error.length > 0 ? error : ""}</div>
				<div className="app_input">
					<input className="_input" type="text" placeholder="Search / Add titles" value={title} 
			        	onChange={(e)=>{
			        		this.searchUpdated(e.target.value);
			        	}} 
			        	onKeyDown={(e)=>{
			        		if(e.keyCode == 13){
	            				this.onSubmit();
	         				}
		        		}}/>
					<button className="_button" onClick={(e)=>{this.onSubmit()}}>Add</button>
				</div>
				<div className="app_title_list">
					{Array.isArray(filteredTitle) ? filteredTitle.map((title, index) => {
						return (
							<div className="app_item" key={index}>{title.title}</div>
						)
					}) : null}
				</div>
			</div>
		)
	}
}

function mapStateToProps(store) {
  return {store}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ addTitle, listTitles, getTitle }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleManager)