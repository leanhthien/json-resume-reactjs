import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import 'bootstrap/dist/css/bootstrap.css';
import "./views/Detail/Detail.css";
import './App.css';
import API from './api';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


const loadingComponent = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading: loadingComponent
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading: loadingComponent
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading: loadingComponent
});

const ShareResume = Loadable({
  loader: () => import('./views/Pages/ShareResume'),
  loading: loadingComponent
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading: loadingComponent
});

class App extends Component {

  async componentDidMount() {
    await new API().getBaseURLFromHeroku();
  }

  render() {
    return (
      <BrowserRouter>
      <ReactNotification />
            <Switch>
              <Route exact path="/share-resume/:name" name="Share Page" component={ShareResume} />
              <Route exact path="/register" name="Register Page" component={Register} />
              <Route exact path="/404" name="Page 404" component={Page404} />
              <Route path="/login"  name="Login Page" component={Login}/>
              <Route path="/"  name="Home" component={DefaultLayout}/>
            </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
