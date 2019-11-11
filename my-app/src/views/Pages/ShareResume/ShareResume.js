import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API from "../../../api";

class ShareResume extends Component {
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
    this.apiBaseUrl = "";
    this.name = this.props.match.params.name;
  }

  async componentDidMount() {
    await new API().getBaseURLFromHeroku().then(() => {
      this.apiBaseUrl = Cookies.get("baseURL");
      this.getDetailResume();
    });
  }

  async getDetailResume() {
    // let response = await new API().getDetailShareResume(this.apiBaseUrl, this.name);

    // console.log('Response: ' + response);

    try {
      let response = await axios({
        url: "view",
        method: "GET",
        baseURL: this.apiBaseUrl,
        params: {
          name: this.name
        }
      });

      if (response.data.data) {
        this.setState({
          resume: {
            name: response.data.data.name,
            jobTitle: response.data.data.jobTitle,
            telephone: response.data.data.telephone,
            address: response.data.data.address,
            email: response.data.data.email,
            language: response.data.data.language,
            about: response.data.data.about,
            workExperience: response.data.data.workExperience
          }
        });
      } else {
        this.props.history.push("/404");
      }
    } catch (error) {
      this.props.history.push("/404");
    }
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
                    <a
                      className="link-disguise"
                      href={resume.email}
                      itemProp="email"
                    >
                      {resume.email}
                    </a>
                  </span>
                </div>
                <div className="detail">
                  <span className="icon">
                    <i className="icon fs-lg icon-link"></i>
                  </span>
                  <span className="info">
                    <a
                      href={resume.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
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

export default ShareResume;
