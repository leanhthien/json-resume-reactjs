import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Cookies from "js-cookie";

import routes from "../../routes";

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.apiBaseUrl = process.env.REACT_APP_BASE_URL;
    this.token = Cookies.get("token");
    this.username = Cookies.get("username");
    
  }

  componentDidMount() {
    if (!Cookies.get("token")) {
      
      return this.props.history.push("/login");
    }
    

  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div>
        <main className="main">
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <a className="navbar-brand" href="/">
              Json Resume
            </a>
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link guestNavigation" href="/regiter">
                  Sign up
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link guestNavigation" href="/login">
                  Sign in
                </a>
              </li>
              <li className="nav-item">
                <a
                  id="usernameNavigation"
                  className="nav-link userNavigation"
                  href="/dashboard"
                >
                  {this.username}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link userNavigation" href="/">
                  Create resume
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link userNavigation" href="">
                  Log out
                </a>

              </li>
            </ul>
          </nav>

          <Container fluid>
            <Suspense fallback={this.loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Container>
        </main>
      </div>
    );
  }
}

export default DefaultLayout;
