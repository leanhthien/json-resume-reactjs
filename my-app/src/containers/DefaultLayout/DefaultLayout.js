import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import axios from "axios";
import Cookies from "js-cookie";

import routes from "../../routes";

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.user = Cookies.get("username");
    // this.navigation = navigation(parseInt(this.role));
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
