import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Index from './components/Index'
import Details from './components/Details'
import TopTen from './components/TopTen';

class App extends Component
{
    render() {
        return(
          <Router>
            <div className="">
              {/* <Header/> */}

              <Switch>
                <Route path='/' component={Index} exact/>
                <Route path='/topten' component={TopTen} exact/>
                {/* <Route path='/details/:id' component={Details} exact/> */}
                <Route path="/details/:id" render={(props) => <Details {...props} />}/> 
              </Switch>
            </div>
          </Router>
        )
    }
}
export default App