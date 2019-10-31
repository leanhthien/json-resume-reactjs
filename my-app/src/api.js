import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

class API extends Component {
  constructor(props) {
    super(props);
    this.apiBaseUrl = process.env.REACT_APP_BASE_URL;
    this.token = Cookies.get("token");
    this.username = Cookies.get("username");
    this.authorization = {
      headers: {
        Authorization: this.token
      }
    };
  }

  async checkPermission() {
    try {
      await axios.get(`${this.apiBaseUrl}token`, this.authorization);
    } catch (error) {
      this.props.history.push("/login");
    }
  }

  
}

export default API;
