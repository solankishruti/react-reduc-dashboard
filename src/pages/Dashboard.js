import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadUsersStart } from "../redux/actions";
// import { PieChart } from "react-minimal-pie-chart";
import HSBar from "react-horizontal-stacked-bar-chart";
import CanvasJSReact from "../assets/canvasjs.react";
import userlogo from "../public/dist/img/user2-160x160.jpg";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { allusers } = useSelector((state) => state.data);

  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Number of iPhones Sold",
    },
    axisY: {
      title: "Number of iPhones ( in Million )",
      includeZero: false,
    },
    data: [
      {
        type: "area",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0.## Million",
        dataPoints: [
          { x: new Date(2017, 0), y: 7.6 },
          { x: new Date(2016, 0), y: 7.3 },
          { x: new Date(2015, 0), y: 6.4 },
          { x: new Date(2014, 0), y: 5.3 },
          { x: new Date(2013, 0), y: 4.5 },
          { x: new Date(2012, 0), y: 3.8 },
          { x: new Date(2011, 0), y: 3.2 },
        ],
      },
    ],
  };
  const options_pie = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Website Traffic Sources",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 18, label: "Direct" },
          { y: 49, label: "Organic Search" },
          { y: 9, label: "Paid Search" },
          { y: 5, label: "Referral" },
          { y: 19, label: "Social" },
        ],
      },
    ],
  };
  useEffect(() => {
    dispatch(loadUsersStart());
  }, [dispatch]);
  const data = allusers.length;
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 style={{ textAlign: "left" }}>Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                {/* <li className="breadcrumb-item">
                  <Link to={"#"}>
                </li> */}
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-3">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{data}</h3>

                    <p>All Users</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag"></i>
                  </div>
                  <Link to={"/home"} className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>

              <div className="Col-lg-3 col-3">
                <div className="card card-success">
                  <div className="card-header">
                    <h3 className="card-title">Horizontal Stacked Chart</h3>

                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chartjs-size-monitor">
                      <div className="chartjs-size-monitor-expand">
                        <div className=""></div>
                      </div>
                      <div className="chartjs-size-monitor-shrink">
                        <div className=""></div>
                      </div>
                    </div>
                    <HSBar
                      showTextDown
                      id="hsbarExample"
                      data={[
                        { value: 10000, color: "red" },
                        {
                          value: 5000,
                          description: "5.000",
                          color: "rgb(0,255,0)",
                        },
                        { value: 3000, description: "3.000", color: "blue" },
                      ]}
                      // onClick={(e) =>
                      //   this.setState((state) => ({
                      //     ...state,
                      //     value: e.bar.value,
                      //   }))
                      // }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="Col-lg-3 col-4">
                <div className="card card-success">
                  <div className="card-header">
                    <h3 className="card-title">Area Chart</h3>

                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chartjs-size-monitor">
                      <div className="chartjs-size-monitor-expand">
                        <div className=""></div>
                      </div>
                      <div className="chartjs-size-monitor-shrink">
                        <div className=""></div>
                      </div>
                    </div>
                    <CanvasJSChart
                      options={options}
                      /* onRef={ref => this.chart = ref} */
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-4">
                <div className="card card-danger direct-chat direct-chat-danger">
                  <div className="card-header">
                    <h3 className="card-title">Direct Chat</h3>
                    <div className="card-tools">
                      <span
                        data-toggle="tooltip"
                        title="3 New Messages"
                        className="badge badge-light"
                      >
                        3
                      </span>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-toggle="tooltip"
                        title="Contacts"
                        data-widget="chat-pane-toggle"
                      >
                        <i className="fas fa-comments"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="direct-chat-messages">
                      <div className="direct-chat-msg">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-left">
                            Alexander Pierce
                          </span>
                          <span className="direct-chat-timestamp float-right">
                            23 Jan 2:00 pm
                          </span>
                        </div>

                        <img
                          className="direct-chat-img"
                          src={userlogo}
                          alt="message user"
                        />

                        <div className="direct-chat-text">
                          Is this template really for free? That's unbelievable!
                        </div>
                      </div>

                      <div className="direct-chat-msg right">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-right">
                            Sarah Bullock
                          </span>
                          <span className="direct-chat-timestamp float-left">
                            23 Jan 2:05 pm
                          </span>
                        </div>

                        <img
                          className="direct-chat-img"
                          src={userlogo}
                          alt="message user"
                        />

                        <div className="direct-chat-text">
                          You better believe it!
                        </div>
                      </div>

                      <div className="direct-chat-msg">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-left">
                            Alexander Pierce
                          </span>
                          <span className="direct-chat-timestamp float-right">
                            23 Jan 5:37 pm
                          </span>
                        </div>

                        <img
                          className="direct-chat-img"
                          src={userlogo}
                          alt="message user"
                        />

                        <div className="direct-chat-text">
                          Working with AdminLTE on a great new app! Wanna join?
                        </div>
                      </div>

                      <div className="direct-chat-msg right">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-right">
                            Sarah Bullock
                          </span>
                          <span className="direct-chat-timestamp float-left">
                            23 Jan 6:10 pm
                          </span>
                        </div>

                        <img
                          className="direct-chat-img"
                          src={userlogo}
                          alt="message user"
                        />

                        <div className="direct-chat-text">I would love to.</div>
                      </div>
                    </div>

                    <div className="direct-chat-contacts">
                      <ul className="contacts-list">
                        <li>
                          <Link to={"#"}>
                            <img
                              alt="chat_image"
                              className="contacts-list-img"
                              src={userlogo}
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Count Dracula
                                <small className="contacts-list-date float-right">
                                  2/28/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                How have you been? I was...
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li>
                          <Link to={"#"}>
                            <img
                              alt="chat_image"
                              className="contacts-list-img"
                              src={userlogo}
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Sarah Doe
                                <small className="contacts-list-date float-right">
                                  2/23/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                I will be waiting for...
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li>
                          <Link to={"#"}>
                            <img
                              alt="chat_image"
                              className="contacts-list-img"
                              src={userlogo}
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Nadia Jolie
                                <small className="contacts-list-date float-right">
                                  2/20/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                I'll call you back at...
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li>
                          <Link to={"#"}>
                            <img
                              alt="chat_image"
                              className="contacts-list-img"
                              src={userlogo}
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Nora S. Vans
                                <small className="contacts-list-date float-right">
                                  2/10/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                Where is your new...
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li>
                          <Link to={"#"}>
                            <img
                              alt="chat_image"
                              className="contacts-list-img"
                              src={userlogo}
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                John K.
                                <small className="contacts-list-date float-right">
                                  1/27/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                Can I take a look at...
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li>
                          <Link to={"#"}>
                            <img
                              alt="chat_image"
                              className="contacts-list-img"
                              src={userlogo}
                            />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Kenneth M.
                                <small className="contacts-list-date float-right">
                                  1/4/2015
                                </small>
                              </span>
                              <span className="contacts-list-msg">
                                Never mind I found...
                              </span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="card-footer">
                    <form action="#" method="post">
                      <div className="input-group">
                        <input
                          type="text"
                          name="message"
                          placeholder="Type Message ..."
                          className="form-control"
                        />
                        <span className="input-group-append">
                          <button type="button" className="btn btn-primary">
                            Send
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="Col-lg-3 col-4">
                <div className="card card-danger">
                  <div className="card-header">
                    <h3 className="card-title">Pie Chart</h3>

                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chartjs-size-monitor">
                      <div className="chartjs-size-monitor-expand">
                        <div className=""></div>
                      </div>
                      <div className="chartjs-size-monitor-shrink">
                        <div className=""></div>
                      </div>
                    </div>
                    <CanvasJSChart options={options_pie} />
                    {/* <PieChart
                      data={[
                        { title: "One", value: 10, color: "#E38627" },
                        { title: "Two", value: 15, color: "#C13C37" },
                        { title: "Three", value: 20, color: "#6A2135" },
                      ]}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
