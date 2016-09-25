import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { enterTitle, addTitle, listTitles } from '../actions/TitleManager'
import { LIST_TITLE } from '../config'
import 'whatwg-fetch'
class TitleManager extends Component{
	componentDidMount() {
		fetch(LIST_TITLE)
		  .then(response => response.json())
		  .then(data => {
		  	console.log(data);
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
	render() {
		console.log(this.props);
		var titles = this.props.store.titleManager.titles;
		var error = this.props.store.titleManager.error;
		return (
			<div>
				<div className="app_header">EA Games Library</div>
				<div className="app_error">{error.length > 0 ? error : ""}</div>
				<div className="app_input">
					<input className="_input" type="text" placeholder="Add a new title" 
			        	onChange={(e)=>{
			        		console.log(this.props);
			        		this.props.enterTitle(e.target.value);
			        	}}/>
					<button className="_button" onClick={(e)=>{this.onSubmit()}}>&gt;</button>
				</div>
				<div className="app_title_list">
					{Array.isArray(titles) ? titles.map((title, index) => {
						return (
							<div key={index}>{title.title}</div>
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
  return Object.assign({}, bindActionCreators({ enterTitle, addTitle, listTitles }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleManager)