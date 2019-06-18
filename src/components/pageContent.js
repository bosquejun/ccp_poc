import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import "./cpp.css";
import { Layout, Breadcrumb, Input, Button } from "antd";
import Sider from "antd/lib/layout/Sider";

const { Content } = Layout;

export class PageContent extends React.Component {
  activeAgent = null;

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
    script.src = "https://d2cehk6d2egv65.cloudfront.net/amazon-connect.min.js";
    script.async = true;
    script.onload = () => this._initializeCCP();

    document.body.appendChild(script);
  }

  _initializeCCP() {
    let that = this;
    this.connect = connect;
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

    // this.connect.agent(a => {
    //   let _this = this;
    //   if (this.connect.core.initialized) {
    //     this.activeAgent = _this.f();
    //     this.setState({
    //       initializedCCP: true,
    //       isAgentInitialized: true,
    //       activeAgent: this
    //     });
    //   }
    // });
  }

  _initAgentProfile = e => {
    debugger;
    console.log(this.activeAgent().getName());
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
            <div className="agentInfo">
              <p>
                Name:
                {/* {this.state.activeAgent === null
            ? ""
            : this.state.activeAgent.getName()} */}
              </p>
              <p>Username:</p>
              <p>Status:</p>
              <Button onClick={this._initAgentProfile}>click me</Button>
            </div>
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
