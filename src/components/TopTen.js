import axios from 'axios'
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css'
import { Col, Row } from 'reactstrap';

class TopTen extends Component {

    constructor() {
        super()
        this.state = {
            movies: [],
			searchInput : '',
        }
    }
    componentDidMount() {
        axios.post('http://localhost:4000/movie/top-ten-movies').then(res => {
            this.setState({
                movies: res.data
            })
            console.log(res)
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
    changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}
    render() {
        return (
            <div className="card">
                <div className="card-header bgcol">
                    <h4 className="card-title movies-logo"> Top-10 Movies </h4>
                    <input type='text' name="searchInput" className='searchinput' value={this.state.searchInput} onChange={this.changeHandler} placeholder='Search...' />
					
                    </div>

                <div className="card-body movies-div">

                    <Row>
                        {this.state.movies.filter(data => {
                            if (data.name.toLowerCase().trim().includes(this.state.searchInput.toLowerCase().trim())) {
                                return data
                            } else {
                                return null
                            }
                        }).map((movie, i) => (
                            <Col lg="3" key={i} style={{ marginBottom: 25 }}>
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
            </div>
        )
    }
}

export default TopTen