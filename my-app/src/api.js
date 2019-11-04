import { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { store } from "react-notifications-component";

class API extends Component {
  async getBaseURLFromHeroku() {
    try {
      let response = await axios.get(
        `https://api.heroku.com/apps/json-resume-reactjs/config-vars`,
        {
          headers: {
            Accept: "application/vnd.heroku+json; version=3",
            Authorization: "Bearer 51f661c8-37f8-4d57-a532-83ec9ac9f41a"
          }
        }
      );

      if (response.data) {
        Cookies.set("baseURL", response.data.BASE_URL);
      }
    } catch (error) {
      let message = error.response.data.data
        ? error.response.data.data
        : "Cannot get base URL!";

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
      let message = error.response.data.data
        ? error.response.data.data
        : "Cannot validate!";

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
    }
  }

  showError(error, defaultMessage) {

    let message;

    if (error && error.response  && error.response.data && error.response.data.data) {
      message = error.response.data.data
    }
    else {
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
