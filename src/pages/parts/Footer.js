import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <footer className="main-footer no-print">
        <div className="float-right d-none d-sm-block">
          <b>Version</b> 3.2.0
        </div>
        <strong>
          Copyright © 2022{" "}
          <Link to={"https://shrutisolanki205.github.io/"}>Shruti</Link>
        </strong>{" "}
        All rights reserved.
      </footer>
    );
  }
}
