import React from "react";
import { Layout, Icon } from "antd";
import Home from "./Home";
import "./App.css";

const App = () => {
  return (
    <Layout className="App">
      <Layout.Content>
        <div className="box">
          <Home />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Icon type="code" /> with <Icon type="heart" /> by
        <a href="https://github.com/dhimasanb"> @dhimasanb</a>
      </Layout.Footer>
    </Layout>
  );
};

export default App;
