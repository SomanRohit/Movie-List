import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css'
import { Col, Row } from 'reactstrap';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
class Index extends Component {

	constructor() {
		super();
		this.state = {
			name : '',
			genre : '', 
			details : '',
			date : '',
			reviews : '',
			searchInput : '',
			movies: [],
			openModal: false
		}
		axios.get('http://localhost:4000/movie').then(res => {
			this.setState({ movies: res.data })
			console.log(res)
		}).catch(err => {
			console.log(err)
		})
	}

	componentDidMount() {
		
	}
	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}
	submitHandler = (e) => {
		axios.post('http://localhost:4000/movie/create-movie',{ name : this.state.name  , genre : this.state.genre, details : this.state.details, releasedate : this.state.date, reviews : this.state.reviews}).then(res => {
			console.log('submited successfully', res.data)
			alert('submit successfully');
		}).catch(err => {
			console.log(err)
		})
	}
	upvote(e) {
		axios.post(`http://localhost:4000/movie/upvote/${e}`).then(res => {
			console.log(res)
			window.location.reload(false);
		}).catch(err => {
			console.log(err)
		})
	}
	downvote(e) {
		axios.post(`http://localhost:4000/movie/downvote/${e}`).then(res => {
			window.location.reload(false)
		}).catch(err => {
			console.log(err)
		})
	}

	onClickButton = e => {
		e.preventDefault()
		this.setState({ openModal: true })
	}
	onCloseModal = () => {
		this.setState({ openModal: false })
	}
	render() {
		const { name, genre, details, date, reviews } = this.state
		return (
			<div className="card">
				<div className="card-header bgcol">
					<h4 className="card-title movies-logo"> Movies </h4>
					<button className="addmovies" onClick={this.onClickButton}>Add Movies</button>
					<input type='text' name="searchInput" className='searchinput' value={this.state.searchInput} onChange={this.changeHandler} placeholder='Search...' />
					<button type="button" className="btn btn-primary btn-sm pull-right toptenbtn" data-toggle="modal" data-target="#addModal"> <Link to='/topten' className='topcolor'> Top 10 Movies </Link> </button>
				</div>
				<Modal open={this.state.openModal} onClose={this.onCloseModal}>
					<br />
					<h3> Add Movie </h3>
					<form onSubmit={this.submitHandler}>
						<input type='text' name="name" value={name} onChange={this.changeHandler} placeholder='Movie Name' /><br /> <br />
						<input type='text' name="genre" value={genre} onChange={this.changeHandler} placeholder='Genre' /> <br /> <br />
						<input type='text' name="details" value={details} onChange={this.changeHandler} placeholder='Details' /> <br /> <br />
						<input type='date' name="date" value={date} onChange={this.changeHandler} placeholder='Release Date' style={{ width: '100%' }} /><br /><br />
						<input type='text' name="reviews" value={reviews} onChange={this.changeHandler} placeholder='Reviews' />
						<button onClick={this.submitHandler}>Submit</button>
					</form>
				</Modal>
				
						

				<div className="card-body movies-div">

					<Row>
						{this.state.movies.filter(data=>{
							if( data.name.toLowerCase().trim().includes(this.state.searchInput.toLowerCase().trim())){
								return data
							}else{
								return null
							}
						}).map((movie, i) => (
							<Col lg="3" key={i} style={{marginBottom: 25}}>
								<div className="allcenter" style={{ width: "75%" }}>
									<img src={require("../movieimg.jpg")} style={{ width: "100%" }} />
									<div className="all_back">
										<h5 className="movieName"> {movie.name} </h5>
										<p className="movieName">  {movie.genre} </p>
										<Row>
											<Col lg="6" className='centerbuttons'>
												<button class="like-btn" onClick={this.upvote.bind(this, movie.id)}> <span className=''><i className="fa fa-thumbs-o-up"></i></span> </button> <span style={{color:'#fff'}}> {movie.upvote}</span> 
											</Col>
											<Col lg="6">
												<button class="like-btn" onClick={this.downvote.bind(this, movie.id)}> <i className="fa fa-thumbs-o-down"></i>  </button><span style={{color:'#fff'}}> {movie.downvote}</span>
											</Col>
										</Row>
										<center><button className='viewbutton'><Link to={`/details/${movie.id}`}>Details</Link></button></center>

									</div>
								</div>
							</Col>
						))}
					</Row>
				</div>

				{/* <div className="card-body movies-div">
					<div className="col-md-12">
						<table className="table table-bordered">
							<thead>
								<tr>
									<th> Name </th>
									<th> Genre </th>
									<th> Details </th>
									<th> Reviews </th>
									<th> Release Date </th>
									<th> Upvote </th>
									<th> Downvote </th>
								</tr>
							</thead>
							<tbody>
								{this.state.movies.map((movie, i) => (
									<tr key={i}>
										<td> {movie.name} </td>
										<td> {movie.genre} </td>
										<td> {movie.details} </td>
										<td> {movie.reviews} </td>
										<td> {movie.releasedate} </td>
										<td> <button onClick={this.upvote.bind(this, movie.id)}>{movie.upvote}</button> </td>
										<td> <button onClick={this.downvote.bind(this, movie.id)}>{movie.downvote}</button> </td>
										<td> <Link to={`/details/${movie.id}`}>Details</Link> </td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div> */}
			</div>
		)
	}
}
export default Index