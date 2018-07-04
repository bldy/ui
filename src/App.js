import React, { Component } from "react";
import "./App.css";
import Button from "@material/react-button/dist";
import Logo from "./components/Logo";
import Build from "./components/Build";

class App extends Component {
  render() {
    return (
      <div
        style={{
          marginRight: "auto",
          marginLeft: "auto",
          width: 1200,
          paddingTop: 20
        }}
      >
        <div style={{ alignItems: "center", display: "flex" }}>
          <Logo width={64} />
          <h1>bldy</h1>
        </div>
        <div>
          <div style={{ width: 1200 - 300, display: "flex" }}>
            <div
              style={{
                width: 64,
                height: 64,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <i class="material-icons md-36">directions_run</i>
            </div>
            <h2 style={{ display: "flex" }}>cf-kernel</h2>
          </div>

          <Build width={300} height={200} />
        </div>
      </div>
    );
  }
}

export default App;
