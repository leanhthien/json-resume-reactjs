import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API from "../../api";

class ResumeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      name: "",
      jobTitle: "",
      telephone: "",
      address: "",
      email: "",
      website: "",
      language: "",
      about: "",
      workExperience: "",
      enabled: false
    };
    this.apiBaseUrl = process.env.REACT_APP_BASE_URL;
    this.token = Cookies.get("token");
    this.username = Cookies.get("username");
    this.id = this.props.match.params.id;
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

    if (this.id) {
      let data = await this.getDetailResume();
      await this.setState({
        name: data.name,
        jobTitle: data.jobTitle,
        telephone: data.telephone,
        address: data.address,
        email: data.email,
        website: data.website,
        language: data.language,
        about: data.about,
        workExperience: data.workExperience,
        enabled: data.enabled
      });
    }
  }

  async getDetailResume() {
    try {
      let response = await axios.get(
        `${this.apiBaseUrl}product/detail?id=${this.id}`
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

  async submitClick(event) {
    event.preventDefault();
    let request;
    if (this.id) {
      request = "edit";
    } else {
      request = "new";
    }

    try {
      let params = {
          productId: this.id,
          name: this.state.name,
          jobTitle: this.state.jobTitle,
          telephone: this.state.telephone,
          address: this.state.address,
          email: this.state.email,
          website: this.state.website,
          language: this.state.language,
          about: this.state.about,
          workExperience: this.state.workExperience
      };

      let response = await axios.post(
        `${this.apiBaseUrl}product/${request}?username=${this.username}`,
        params
      );

      if (response.data.data) {
        this.props.history.push(`/resume/detail/${response.data.data.productId}`);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  onChangeName = e => {
    this.setState({ name: e.target.value });
  };

  onChangeJobTitle = e => {
    this.setState({ jobTitle: e.target.value });
  };

  onChangeAddress = e => {
    this.setState({ address: e.target.value });
  };

  onChangeTelephone = e => {
    this.setState({ telephone: e.target.value });
  };

  onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  onChangeWebsite = e => {
    this.setState({ website: e.target.value });
  };

  onChangeLanguage = e => {
    this.setState({ language: e.target.value });
  };

  onChangeAbout = e => {
    this.setState({ about: e.target.value });
  };

  onChangeWorkExperience = e => {
    this.setState({ workExperience: e.target.value });
  };

  render() {
    const {
      name,
      jobTitle,
      telephone,
      address,
      email,
      website,
      language,
      about,
      workExperience
    } = this.state;

    return (
      <div id="resumeFormContainer" className="page">
        <h2 className="text-center">Resume Details</h2>
        <div>
          <form
            id="resumeForm"
            className="form-horizontal"
            method="post"
          >
            <input type="hidden" name="productId" />
            <div className="form-group">
              <label className="col-sm-2 control-label">Name:</label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={this.onChangeName}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Job Title:</label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="jobTitle"
                  value={jobTitle}
                  onChange={this.onChangeJobTitle}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Address:</label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={this.onChangeAddress}
                  name="address"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Telephone:</label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  value={telephone}
                  onChange={this.onChangeTelephone}
                  name="telephone"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Email:</label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={this.onChangeEmail}
                  name="email"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Website:</label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  value={website}
                  onChange={this.onChangeWebsite}
                  name="website"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Language:</label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  value={language}
                  onChange={this.onChangeLanguage}
                  name="language"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">About:</label>
              <div className="col">
                <textarea
                  className="form-control"
                  rows="3"
                  name="about"
                  value={about}
                  onChange={this.onChangeAbout}
                ></textarea>
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-2 control-label">Work Experience:</label>
              <div className="col">
                <textarea
                  className="form-control"
                  rows="5"
                  name="workExperience"
                  value={workExperience}
                  onChange={this.onChangeWorkExperience}
                ></textarea>
              </div>
            </div>

            
          </form>

          <div className="text-center">
              <button
                id="buttonResumeForm"
                type="submit"
                className="btn btn-info"
                onClick={event => this.submitClick(event)}
              >
                Submit
              </button>
              <button
                id="buttonResumeForm"
                className="btn btn-danger"
                onClick={this.props.history.goBack}
              >
                Back
              </button>
            </div>
        </div>
      </div>
    );
  }
}

export default ResumeForm;
