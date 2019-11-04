import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API from "../../api";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumes: [],
      shareLink: "",
      err: false,
      msg: ""
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
    await new API()
      .checkPermission(this.apiBaseUrl, this.token)
      .then(response => {})
      .catch(error => {
        this.props.history.push("/login");
      });

    let data = await this.getUserResume();

    this.setState({ resumes: data });
    this.setState({
      shareLink: `${window.location.origin}/share-resume/${this.username}`
    });
  }

  async getUserResume() {
    try {
      let response = await axios.get(
        `${this.apiBaseUrl}product/user?username=${this.username}`
      );

      if (response.data.data) {
        return response.data.data;
      } else {
        new API().showError(null, "Cannot get data!");
      }
    } catch (error) {
      new API().showError(error, "Cannot get data!");
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
        enableStar = (
          <i className="fa fa-star" style={{ color: "#16a2b8" }}></i>
        );
        enableTop = "";
      } else {
        enableStar = "";
        enableTop = (
          <button
            className="link-button"
            onClick={event => this.enableTopClick(event, element.productId)}
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
              onClick={event => this.viewClick(event, element.productId)}
            >
              View
            </button>
          </td>
          <td>
            <button
              className="link-button"
              onClick={event => this.editClick(event, element.productId)}
            >
              Edit
            </button>
          </td>
          <td>{enableTop}</td>
          <td>
            <button
              className="link-button"
              onClick={event => this.deleteClick(event, element.productId)}
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
          value={this.state.shareLink}
        ></input>
      </div>
    );

    if (!this.state.resumes || this.state.resumes.length <= 0) {
      return emptyModal;
    } else {
      return linkSharedModal;
    }
  };

  async viewClick(event, id) {
    event.preventDefault();
    this.props.history.push(`/resume/detail/${id}`);
  }

  async editClick(event, id) {
    event.preventDefault();
    this.props.history.push(`/resume/edit/${id}`);
  }

  async enableTopClick(event, id) {
    event.preventDefault();
    try {
      let params = new URLSearchParams();
      params.append("username", this.username);
      params.append("id", id);

      let response = await axios.post(
        `${this.apiBaseUrl}product/enable`,
        params
      );

      if (response.data.data) {
        this.showUserResume();
      } else {
        this.setState({ error: true, msg: "Cannot enable product!" });
      }
    } catch (error) {
      this.setState({ error: true, msg: "Cannot enable product!" });
    }
  }

  async deleteClick(event, id) {
    event.preventDefault();
    try {
      let params = new URLSearchParams();
      params.append("username", this.username);
      params.append("id", id);

      let response = await axios.post(
        `${this.apiBaseUrl}product/delete`,
        params
      );

      if (response.data.data) {
        this.showUserResume();
      } else {
        this.setState({ error: true, msg: "Cannot delete product!" });
      }
    } catch (error) {
      this.setState({ error: true, msg: "Cannot delete product!" });
    }
  }

  async createClick(event) {
    event.preventDefault();
    this.props.history.push("/resume/new");
  }

  renderErrorLoadUser() {
    if (this.state.error) {
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
          {this.renderErrorLoadUser()}

          <button
            type="button"
            className="btn btn-info"
            onClick={event => this.createClick(event)}
          >
            Create resume
          </button>

          {this.renderErrorLoadUser()}
        </div>
      </div>
    );
  }
}

export default Dashboard;
