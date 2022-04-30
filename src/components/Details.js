import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Create from './Create'
import Edit from './Edit'
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Moment from 'react-moment';
class Details extends Component
{
	constructor({match}) {
		const id = match.params.id 
		
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			movies : []
		}
		axios.get(`http://localhost:4000/movie/${id}`).then(res => {
			this.setState({movies: res.data})
			console.log(res)
		}).catch(err => {
			console.log(err)
		})

	
	}
	

    render() {
      return(
		
          	<div className="card">
			    <div className="card-header bgcol">
					<h4 className="card-title movies-logo"> Movies </h4>
					<button type="button" className="btn btn-primary btn-sm pull-right toptenbtn" data-toggle="modal" data-target="#addModal"> <Link to='/topten' className='topcolor'> Top 10 Movies </Link> </button>
				</div>

				<div className="card-body movies-div">
				{this.state.movies.map((movie, i) => (
					<Row  key={i}>					
						
							<Col lg="5">
								<div className="">
									<img src={require("../movieimg.jpg")} style={{ width: "100%" }} />
																		
								</div>
							</Col>
							<Col>
							
							<h5 className="movieName1"> Movie Name: {movie.name} </h5>
							<hr/>
							<p className="movieName1"> Genre : {movie.genre} </p>
							<hr/>
							<p className="movieName1"> About : {movie.details} </p>
							<hr/>
							<p className="movieName1"> Release Date :
							<Moment format='DD-MM-YYYY'>{movie.releasedate}</Moment>
							 </p>
							<hr/>
							<p className="movieName1"> Reviews : {movie.reviews} </p>
							<hr/>
							<Row>
								<Col>
									<sapn className="movieName1"> Likes : {movie.upvote} </sapn>
								</Col>
								<Col>
								<sapn className="movieName1"> Dislike : {movie.downvote} </sapn>
								</Col>
							</Row>
							</Col>
						
					</Row>
					))}
				</div>
			</div>
        )
    }
}
export default Details