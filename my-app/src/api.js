import { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { store } from "react-notifications-component";

class API extends Component {

  async getBaseURLFromHeroku() {
    await axios
      .get(`https://api.heroku.com/apps/json-resume-reactjs/config-vars`, {
        headers: {
          Accept: "application/vnd.heroku+json; version=3",
          Authorization: "Bearer 51f661c8-37f8-4d57-a532-83ec9ac9f41a"
        }
      })
      .then(response => {

        Cookies.set("baseURL", response.data.BASE_URL);
      })
      .catch(error => {
        this.showError(error, "Cannot get base URL!");
      });
  }

  async checkPermission(apiBaseUrl, authorization) {
    try {
      await axios.get(`${apiBaseUrl}token`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization
        }
      });
    } catch (error) {
      this.showError(error, "Cannot validate token!");
    }
  }

  /*
   * API show detail of share resume
   */

  async getDetailShareResume(apiBaseUrl, name) {
    try {
      await axios({
        url: "view",
        method: "GET",
        baseURL: apiBaseUrl,
        params: {
          name: name
        }
      })
      .then(response => {
        console.log('Result: ' + response.data.data);
        return response.data.data;
      })
      .catch(error => {
        this.showError(error, "Cannot get share resume!");
      });
    } catch (error) {
      this.showError(error, "Cannot get share resume!");
    }
  }

  /*
   * Feature show error popup
   */

  showError(error, defaultMessage) {
    let message;
    console.log("Error - " + error);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.data
    ) {
      message = error.response.data.data;
    } else {
      message = defaultMessage;
    }

    store.addNotification({
      title: "Error!",
      message: message,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: false
      }
    });
    return null;
  }
}

export default API;
