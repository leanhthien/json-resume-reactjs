import { Component } from "react";
import axios from "axios";

class API extends Component {


  async checkPermission(apiBaseUrl, authorization) {

    try {
      await axios.get(`${apiBaseUrl}token`, {
        headers: {
          Authorization: authorization
        }
      });
    } catch (error) {
      console.log('Error ' + error);
    }
  }

  async getDetaillResume(apiBaseUrl, id) {
    let params = new URLSearchParams();
      params.append("id", id);

    try {
      await axios.get(`${apiBaseUrl}product/detail`, params);
    } catch (error) {
      console.log('Error ' + error);
    }
  }

  
}

export default API;
