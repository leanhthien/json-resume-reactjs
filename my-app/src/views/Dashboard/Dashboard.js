import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Dashboard extends Component {
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

  async componentDidMount() {
    let status = await this.checkPermission();

    // API.checkPermission;

    let data = await this.getUserResume();
    this.setState({ resumes: data });
  }

  async checkPermission() {
    try {
      await axios.get(`${this.apiBaseUrl}token`, this.authorization);
    } catch (error) {
      this.props.history.push("/login");
    }
  }

  async getUserResume() {
    try {
      let response = await axios.get(
        `${this.apiBaseUrl}product/user?username=${this.username}`,
        this.authorization
      );

      if (response.data.data) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  genResumeTable = () => {
    if (!this.state.resumes || this.state.resumes.length <= 0)
      return this.emptyList();
    else {
      let table = (
        <div>
          <h2>Your Resume List</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Job Title</th>
                <th>Top</th>
                <th colSpan="4">Action</th>
              </tr>
            </thead>
            <tbody>{this.genUserResumeData()}</tbody>
          </table>
        </div>
      );
      return table;
    }
  };

  emptyList = () => (
    <div className="text-center">
      You don't have any resume. Let create new resume!
    </div>
  );

  genUserResumeData = () => {
    let listResume = [];

    let enableStar, enableTop;

    this.state.resumes.forEach((element, index) => {
      if (element.enabled) {
        enableStar = <p>Star</p>;
        enableTop = "";
      } else {
        enableStar = "";
        enableTop = (
          <button
            className="link-button"
            onClick={event => this.enableTopClick(event)}
          >
            Enable top
          </button>
        );
      }

      listResume.push(
        <tr key={index}>
          <td>{element.productId}</td>
          <td>{element.name}</td>
          <td>{element.jobTitle}</td>
          <td>{enableStar}</td>
          <td>
            <button
              className="link-button"
              onClick={event => this.enableTopClick(event)}
            >
              View
            </button>
          </td>
          <td>
            <button
              className="link-button"
              onClick={event => this.enableTopClick(event)}
            >
              Edit
            </button>
          </td>
          <td>{enableTop}</td>
          <td>
            <button
              className="link-button"
              onClick={event => this.enableTopClick(event)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return listResume;
  };

  genModalContent = () => {
    let shareLink = `${window.location.origin}/share-resume/${this.username}`;

    let emptyModal = (
      <div id="empty-resume-modal" className="text-center">
        <p>You don't have any resume to share. Let make new one to start!</p>
      </div>
    );

    let linkSharedModal = (
      <div id="share-link-modal">
        <p>Share this link to another for showing your resume:</p>
        <input
          id="share-link-content"
          type="text"
          className="form-control"
          readOnly
        >
          {shareLink}
        </input>
      </div>
    );

    if (!this.state.resumes || this.state.resumes.length <= 0) {
      return emptyModal;
    } else {
      return linkSharedModal;
    }
  };

  async enableTopClick(event) {
    event.preventDefault();
  }

  async createClick(event) {
    event.preventDefault();
  }

  renderErrorLoadUser() {
    if (this.state.err) {
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
    return (
      <div id="userResumesContainer" className="page">
        <div className="container">
          <div className="row">
            <div className="col-3 text-center">
              <span className="profile-pic-container">
                <div className="profile-pic">
                  <img
                    className="media-object img-circle center-block"
                    data-src="holder.js/100x100"
                    alt="Richard Hendriks"
                    src="https://s.gravatar.com/avatar/7e6be1e623fb85adde3462fa8587caf2?s=100&amp;r=pg&amp;d=mm"
                    itemProp="image"
                  />
                </div>
                <div className="name-and-profession">
                  <h5>{this.username}</h5>
                </div>
              </span>
              <button
                id="modalButton"
                type="button"
                className="btn btn-info"
                data-toggle="modal"
                data-target="#myModal"
              >
                Share resume
              </button>
            </div>
          </div>

          <div className="modal" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  {this.genModalContent()}

                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.genResumeTable()}

          <button
            type="button"
            className="btn btn-info"
            onClick={event => this.createClick(event)}
          >
            Create resume
          </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
