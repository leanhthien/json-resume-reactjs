import React, { Component } from "react";
import "./Detail.css";
import axios from "axios";
import Cookies from "js-cookie";
import API from "../../api";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resume: {
        name: "",
        jobTitle: "",
        telephone: "",
        address: "",
        email: "",
        website: "",
        language: "",
        about: "",
        workExperience: ""
      }
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

      let data = await this.getDetailResume();
      this.setState({
          resume: {
            name: data.name,
            jobTitle: data.jobTitle,
            telephone: data.telephone,
            address: data.address,
            email: data.email,
            website: data.website,
            language: data.language,
            about: data.about,
            workExperience: data.workExperience
          }
        });
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

  editClick(event) {
    event.preventDefault();
    this.props.history.push(`/resume/edit/${this.id}`);
  }

  backClick(event) {
    event.preventDefault();
    return this.props.history.goBack;
  }

  render() {
    const { resume } = this.state;

    return (
      <div id="resumeDetailContainer" className="page container-fluid">
        <div className="row main clearfix">
          <a className="js-floating-nav-trigger floating-nav-trigger" href="#">
            <i className="icon-bars"></i>
            <span className="close-icon">&times;</span>
          </a>
          <nav className="floating-nav js-floating-nav">
            <ul className="list-unstyled">
              <li>
                <a href="#about">
                  <i className="mr-10 icon-board"></i>About
                </a>
              </li>
              <li>
                <a href="#work-experience">
                  <i className="mr-10 icon-office"></i>Work Experience
                </a>
              </li>
            </ul>
          </nav>
          <section className="col-md-3 card-wrapper profile-card-wrapper affix">
            <div className="card profile-card">
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
                <div className="name-and-profession text-center">
                  <h3 itemProp="name">{resume.name}</h3>
                  <h5 className="text-muted" itemProp="jobTitle">
                    {resume.jobTitle}
                  </h5>
                </div>
              </span>
              <hr />
              <div className="contact-details clearfix">
                <div className="detail">
                  <span className="icon">
                    <i className="icon fs-lg icon-location"></i>
                  </span>
                  <span className="info" itemProp="address">
                    {resume.address}
                  </span>
                </div>
                <div className="detail">
                  <span className="icon">
                    <i className="icon fs-lg icon-phone"></i>
                  </span>
                  <span className="info" itemProp="telephone">
                    {resume.telephone}
                  </span>
                </div>
                <div className="detail">
                  <span className="icon">
                    <i className="icon fs-lg icon-mail"></i>
                  </span>
                  <span className="info">
                    <a className="link-disguise" href="#" itemProp="email">
                      {resume.email}
                    </a>
                  </span>
                </div>
                <div className="detail">
                  <span className="icon">
                    <i className="icon fs-lg icon-link"></i>
                  </span>
                  <span className="info">
                    <a href="" target="_blank">
                      {resume.website}
                    </a>
                  </span>
                </div>
                <div className="detail">
                  <span className="icon" title="Languages I speak">
                    <i className="icon fs-lg icon-language"></i>
                  </span>
                  <span className="info">{resume.language}</span>
                </div>
              </div>
              <hr />

              <div id="action-button" className="text-center">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={event => this.editClick(event)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.props.history.goBack}
                >
                  Back
                </button>
              </div>
            </div>
          </section>
          <section className="col-md-9 card-wrapper pull-right">
            <div className="card background-card">
              <h4 className="text-uppercase">Background</h4>
              <hr />
              <div className="background-details">
                <div className="detail" id="about">
                  <div className="icon">
                    <i className="fs-lg icon-board"></i>
                    <span className="mobile-title">About</span>
                  </div>
                  <div className="info">
                    <h4 className="title text-uppercase">About</h4>
                    <div className="card card-nested">
                      <div
                        className="content mop-wrapper"
                        itemProp="description"
                      >
                        {resume.about}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detail" id="work-experience">
                  <div className="icon">
                    <i className="fs-lg icon-office"></i>
                    <span className="mobile-title">Work Experience</span>
                  </div>
                  <div className="info">
                    <h4 className="title text-uppercase">Work Experience</h4>
                    <ul className="list-unstyled clear-margin">
                      <li className="card card-nested clearfix">
                        <div className="content" itemProp="work-experience">
                          {resume.workExperience}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Detail;
