import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Container } from "reactstrap";
import Cookies from "js-cookie";
import routes from "../../routes";

const findRouteName = (url, routes) => {
  let title = "Json Resume";
  routes.find(item => {
    if (url.includes(item.path)) title = item.name;
  });

  return title;
};

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.apiBaseUrl = process.env.REACT_APP_BASE_URL;
    this.token = Cookies.get("token");
    this.username = Cookies.get("username");
  }

  componentDidMount() {
    if (!this.token) {
      return this.props.history.push("/login");
    }
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  setupNavTitle = () => {
    const routeName = findRouteName(this.props.location.pathname, routes);
    console.log("routeName: " + routeName);
    if (routeName) {
      return (
        <Link to={"/"} className="navbar-brand">
          {routeName}
        </Link>
      );
    }
    return null;
  };

  setupNav() {
    let guest = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={"/register"} className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
    let user = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={"/dashboard"} className="nav-link">
            {this.username}
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/resume/new"} className="nav-link">
            Create resume
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={"/"}
            onClick={e => this.logoutClick(e)}
            className="nav-link"
          >
            Logout
          </Link>
        </li>
      </ul>
    );

    return this.token ? user : guest;
  }

  logoutClick = e => {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("userId");
    console.log("Trigger logout");
    this.props.history.push(`/login`);
  };

  render() {
    return (
      <div>
        <main className="main">
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <Route render={props => this.setupNavTitle()} />

            <ul className="navbar-nav mr-auto"></ul>
            {this.setupNav()}
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
