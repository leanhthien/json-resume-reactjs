import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumes: []
    };
    this.apiBaseUrl = process.env.REACT_APP_BASE_URL;
    this.token = Cookies.get("token");
    this.username = Cookies.get("username");
    this.authorization = {
      headers: {
        Authorization: this.token
      }
    };
  }




  
}

export default Detail;
