import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

class Dashboard extends Component {


  async componentDidMount() {

		axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token,
  	}

		if (Cookies.get("token")) {
			this.checkPermission();
		}
		else {
			this.props.history.push("/login");  
		}
	}

  async handleClick(event) {
    event.preventDefault();

    this.checkPermission();

    // let token = Cookies.get("token");

    // let params = new URLSearchParams();
    // params.append("token", token);

    // await axios
    //   .post(`http://127.0.0.1:8080/my-app/api/logout`, params)
    //   .then(response => {
    //     try {
    //       Cookies.remove("token");
    //       Cookies.remove("userId");
    //       Cookies.remove("username");
    //       this.props.history.push("/login");
    //     } catch (error) {
    //       console.log("Cannot remove cookie!");
    //     }
    //   })
    //   .catch(error => {
    //     console.log("Cannot logout!");
    //   });
  }

  async checkPermission() {
    let token = Cookies.get("token");

    await axios
      .get(`http://127.0.0.1:8080/my-app/api/token`)
      .then(response => {
        
       //TODO
      })
      .catch(error => {
        this.props.history.push("/login");
      });
	}
	


  render() {
    return (
      <div>
        <div className="text-center">
          <button
            id="registrationSubmit"
            type="submit"
            className="btn btn-info"
            onClick={event => this.handleClick(event)}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
