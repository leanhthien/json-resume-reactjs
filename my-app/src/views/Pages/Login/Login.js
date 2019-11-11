import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API from "../../../api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formErrors: { username: "", password: "" },
      errLogin: false,
      msg: ""
    };
    // this.apiBaseUrl = process.env.REACT_APP_BASE_URL;
    this.apiBaseUrl = '';
  }

  async componentDidMount() {

    await new API().getBaseURLFromHeroku().then(() => {
      this.apiBaseUrl = Cookies.get("baseURL");
    });

    if (Cookies.get("token")) {
      this.token = Cookies.get("token");
      await axios
        .post(`${this.apiBaseUrl}token`, {
          headers: { Authorization: this.token }
        })
        .then(response => {
          this.props.history.push("/dashboard");
        })
        .catch(error => {
          this.setState({ errLogin: true, msg: error.response.data.data });
        });
    }

  }

  onChangeUsername = e => {
    this.setState({ username: e.target.value });
  };

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  validateField() {
    let usernameValid = this.state.username.length >= 1;
    let passwordValid = this.state.password.length >= 1;

    this.setState({
      formErrors: {
        username: usernameValid ? "" : "Username cannot be empty",
        password: passwordValid ? "" : "Password cannot be empty"
      }
    });

    return usernameValid && passwordValid;
  }

  async handleClick(event) {
    event.preventDefault();

    if (this.validateField()) {
      if (this.apiBaseUrl) {
        let params = new URLSearchParams();
        params.append("username", this.state.username);
        params.append("password", this.state.password);
  
        await axios
          .post(`${this.apiBaseUrl}login`, params)
          .then(response => {
            try {
              Cookies.set("token", response.data.data.token);
              Cookies.set("userId", response.data.data.appUser.userId);
              Cookies.set("username", response.data.data.appUser.userName);
              this.props.history.push("/dashboard");
            } catch (error) {
              this.setState({ errLogin: true, msg: error });
            }
          })
          .catch(error => {
            let message = (error.response.data.data) ? error.response.data.data : "Cannot get login!";
            this.setState({ errLogin: true, msg: message });
          });
      }
      else {
        new API().showError(null, "Server is not ready! Please try later!");
      }
    }
  }

  registerClick(event) {
    this.props.history.push("/register");
  }

  renderErrorLogin() {
    if (this.state.errLogin) {
      return (
        <div className="container alert alert-danger">
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-hidden="true"
          >
            &times;
          </button>
          <strong>Error!</strong> {this.state.msg}
        </div>
      );
    } else {
      return;
    }
  }

  render() {
    const { username, password, formErrors } = this.state;

    let errUsername, errPassword;
    if (formErrors.username) {
      errUsername = (
        <div className="text-center">
          <div className="col-sm-1"></div>
          <label
            id="username-error"
            style={{ color: "red" }}
            className="error form-group"
          >
            {formErrors.username}
          </label>
        </div>
      );
    }
    if (formErrors.password) {
      errPassword = (
        <div className="text-center">
          <div className="col-sm-1"></div>
          <label
            id="password-error"
            style={{ color: "red" }}
            className="error form-group"
          >
            {formErrors.password}
          </label>
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-center">Log in</h2>

        {this.renderErrorLogin()}

        <form
          id="loginForm"
          className="form-horizontal"
          action="login"
          method="post"
        >
          <div className="form-group d-flex justify-content-center">
            <label className="col-sm-1 control-label">Username:</label>
            <div className="col-sm-6">
              <input
                type="text"
                value={username}
                autoComplete="username"
                onChange={this.onChangeUsername}
                className="form-control"
              />
            </div>
          </div>
          {errUsername}

          <div className="form-group d-flex justify-content-center">
            <label className="col-sm-1 control-label">Password:</label>
            <div className="col-sm-6">
              <input
                type="password"
                name="password"
                value={password}
                autoComplete="current-password"
                onChange={e => this.onChangePassword(e)}
                className="form-control"
              />
            </div>
          </div>
          {errPassword}

          <div className="text-center">
            <button
              id="loginSubmit"
              type="submit"
              className="btn btn-info"
              onClick={event => this.handleClick(event)}
            >
              Log in
            </button>
          </div>
        </form>

        <div className="text-center">
          Don't have an account? Let{" "}
          <button
            className="link-button"
            onClick={event => this.registerClick(event)}
          >
            register
          </button>{" "}
          an account
        </div>
      </div>
    );
  }
}

export default Login;
