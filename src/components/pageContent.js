import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Layout, Breadcrumb, Input, Button, Tag } from "antd";
import Sider from "antd/lib/layout/Sider";

const { Content } = Layout;

export class PageContent extends React.Component {
  // activeAgent = null;

  constructor(props) {
    super(props);
    this.state = {
      initializedCCP: false,
      isAgentInitialized: false,
      activeAgent: null
    };
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "../../module/connect-streams.js";
    script.async = true;
    script.onload = () => this._initializeCCP();

    document.body.appendChild(script);
  }

  _initializeCCP() {
    let that = this;
    this.connect = window["connect"];
    this.connect.core.initCCP(document.getElementById("ccp_container"), {
      ccpUrl: "https://testawsalex.awsapps.com/connect/ccp#/",
      loginPopup: false,
      softphone: {
        allowFramedSoftphone: true
      }
    });

    this.setState({
      initializedCCP: this.connect.core.initialized
    });

    this.connect.contact(contact => {
      debugger;
    });

    this.connect.agent(agent => {
      let _this = this;
      if (that.connect.core.initialized) {
        that.setState({
          initializedCCP: true,
          isAgentInitialized: true,
          activeAgent: agent
        });
        that._initAgentSubscription();
      }
    });
  }

  _initAgentSubscription() {
    var that = this;
    this.state.activeAgent.onRefresh((agent) => {
      that.setState({
        activeAgent: agent
      })
    });
  };

  // renderAgentProfile() {
  //   return (

  //   );
  // }

  openConnect() {
    var win = window.open(
      "https://testawsalex.awsapps.com/connect/ccp#/",
      "_blank"
    );
    win.focus();
  }

  getStatusColor(Status) {
    var color = "#fff";
    switch (Status) {
      case "Available":
        color = "#87d068";
        break;
      case "Offline":
        color = "rgb(143, 150, 140)";
        break;
    }
    return color;
  }

  render() {
    return (
      <Content style={{ padding: "0 50px", marginTop: 64, height: "100vh" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}

        <div>
          <div
            style={{
              width: 320,
              height: 465,
              display: this.state.initializedCCP ? "block" : "none"
            }}
          >
            <div
              id="ccp_container"
              style={{
                width: 320,
                height: 465
              }}
            />
            {!this.state.isAgentInitialized
              ? ""
              : <div className="agentInfo">
                <p>
                  Name: {this.state.activeAgent.getConfiguration().name}

                </p>
                <p>Username: {this.state.activeAgent.getConfiguration().username}</p>

                <div><label>Status: </label><Tag color={this.getStatusColor(this.state.activeAgent.getStatus().name)}>{this.state.activeAgent.getStatus().name}</Tag></div>

              </div>}

          </div>
          {this.state.initializedCCP ? (
            <div />
          ) : (
              <div style={{ marginBottom: 16 }}>
                {/* <Input
                addonBefore="https://"
                addonAfter=".com/connect/ccp#/"
                defaultValue="testawsalex"
              /> */}
                <Button
                  type="primary"
                  style={{ marginTop: "10px", float: "right" }}
                  onClick={this.openConnect}
                >
                  Login
              </Button>
              </div>
            )}
        </div>
      </Content>
    );
  }
}
