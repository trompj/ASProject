// App.js
// Justin Tromp
// SPA navigation, routing, and footer
// TODO: - Make application more mobile friendly. Currently table is relatively hard to view on mobile devices.
//         Typically issues begin at ~804 px screen width.

import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import '../node_modules/bootstrap/scss/bootstrap.scss'
import Navigation from "./components/Navigation";
import './styles/Main.css';
import './App.css';
import '../node_modules/bootstrap/scss/bootstrap.scss'
import Footer from "./components/Footer"
import ContactTable from "./components/ContactTable"

export class App extends Component {
  render() {
    return (
        <div className="container-fluid">
            <Navigation/>
            <br/>

            <Switch>
                <Route exact path="/"> <ContactTable /> </Route>
            </Switch>

            <Footer/>
        </div>
    )
  }
}

export default withRouter(App);
