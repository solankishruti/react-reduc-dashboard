import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  _onClick = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to={"/"}
              className="nav-link"
              data-widget="pushmenu"
              role="button"
              onClick={(e) => this._onClick(e)}
            >
              <i className="fas fa-bars"></i>
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              to={"/"}
              className="nav-link"
              data-widget="fullscreen"
              role="button"
              onClick={(e) => this._onClick(e)}
            >
              <i className="fas fa-expand-arrows-alt"></i>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
