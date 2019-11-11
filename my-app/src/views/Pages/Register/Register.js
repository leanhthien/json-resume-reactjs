import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API from "../../../api";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      retypePassword: "",
      formErrors: {
        username: "",
        password: "",
        retypePassword: ""
      },
      resForm: {
        msg: "",
        hasError: false
      },
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
          headers: { Authorization: `${this.token}` }
        })
        .then(response => {
          this.props.history.push("/dashboard");
        })
        .catch(error => {
          this.setState({
            resForm: { hasError: true, msg: error.response.data.data }
          });
        });
    }
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeRetypePassword(e) {
    this.setState({ retypePassword: e.target.value });
  }

  validateField() {
    let usernameValid = this.state.username.match(
      /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
    );
    let passwordValid = this.state.password.length >= 6;
    let retypePasswordValid = this.state.password === this.state.retypePassword;

    this.setState({
      formErrors: {
        username: usernameValid ? "" : "Invalid username. Username can only contain character(s), number(s) or underscore(s)",
        password: passwordValid ? "" : "Password at least 6 characters",
        retypePassword: retypePasswordValid ? "" : "Do not match password, please re-enter"
      }
    });

    return usernameValid && passwordValid && retypePasswordValid;
  }

  async handleClick(event) {
    event.preventDefault();

    if (this.validateField()) {
      if(this.apiBaseUrl) {
        let params = new URLSearchParams();
      params.append("username", this.state.username);
      params.append("password", this.state.password);
      params.append("retypePassword", this.state.password);

      await axios
        .post(this.apiBaseUrl + `registration`, params)
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
          let message = (error.response.data.data) ? error.response.data.data : "Cannot get register!";
          this.setState({
            resForm: { hasError: true, msg: message }
          });
        });
      }
      else {
        new API().showError(null, "Server is not ready!");
      }
    }
  }

  loginClick(event) {
    event.preventDefault();
    this.props.history.push("/login");
  }

  renderErrorRegister() {
    if (this.state.resForm.hasError) {
      return (
        <div className=" container alert alert-danger">
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-hidden="true"
          >
            &times;
          </button>
          <strong>Error!</strong> {this.state.resForm.msg}
        </div>
      );
    } else {
      return;
    }
  }

  render() {
    const { username, password, retypePassword, formErrors } = this.state;

    let errUsername, errPassword, errRetypePassword;
    if (formErrors.username) {
      errUsername = (
        <div className="text-center">
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
    if (formErrors.retypePassword) {
      errRetypePassword = (
        <div className="text-center">
          <label
            id="retypePassword-error"
            style={{ color: "red" }}
            className="error form-group"
          >
            {formErrors.retypePassword}
          </label>
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-center">Register</h2>

        {this.renderErrorRegister()}

        <form
          id="registrationForm"
          className="form-horizontal"
          action="registration"
          method="post"
        >
          <div className="form-group d-flex justify-content-center">
            <label className="col-sm-1 control-label">Username:</label>
            <div className="col-sm-6">
              <input
                type="text"
                value={username}
                onChange={e => this.onChangeUsername(e)}
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
                onChange={e => this.onChangePassword(e)}
                className="form-control"
              />
            </div>
          </div>
          {errPassword}
          
          <div className="form-group d-flex justify-content-center">
            <label className="col-sm-1 control-label">Retype Password:</label>
            <div className="col-sm-6">
              <input
                type="password"
                name="retypePassword"
                value={retypePassword}
                onChange={e => this.onChangeRetypePassword(e)}
                className="form-control"
              />
            </div>
          </div>
          {errRetypePassword}

          <div className="text-center">
            <button
              id="registrationSubmit"
              type="submit"
              className="btn btn-info"
              onClick={event => this.handleClick(event)}
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center">
          Already have an account? Let{" "}
          <button
            className="link-button"
            onClick={event => this.loginClick(event)}
          >
            log in
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
