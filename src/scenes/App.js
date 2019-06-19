import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import { Layout, Menu, Breadcrumb } from "antd/lib";

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
      <Home/>
        {/* <Layout className="layout">
          <Content style={{ padding: "0 50px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Home/>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout> */}
      </div>
    );
  }
}

export default App;
