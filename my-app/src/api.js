import { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

class API extends Component {


  async getBaseURLFromHeroku() {
    try {
      let response = await axios.get(`https://api.heroku.com/apps/json-resume-reactjs/config-vars`, {
        headers: {
          'Accept': 'application/vnd.heroku+json; version=3',
          'Authorization': 'Bearer 51f661c8-37f8-4d57-a532-83ec9ac9f41a'
      }
      });

      if (response.data) {
        console.log("Response " + response.data.BASE_URL);
        Cookies.set("baseURL", response.data.BASE_URL);
      }
    } catch (error) {
      console.log('Error ' + error);
    }
  }


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
