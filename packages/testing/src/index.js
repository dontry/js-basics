import "./global.css";
import React from "react";
import { Router } from "@reach/router";
import Component from "@reach/component-component";
import ReactDOM from "react-dom";
import LoginForm from "./components/LoginForm";
import LoadUser from "./components/LoadUser";
import App from "./app";

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Component initialState={{}}>
    {({ state, setState }) => {
      // eslint-disable-next-line no-debugger
      // debugger;
      // if (window.Cypress) {
      //   window.appState = state;
      //   window.setAppState = setState;
      // }
      return (
        <LoadUser
          user={state.user}
          setUser={loadedUser => setState({ user: loadedUser })}
        >
          <Router>
            <App
              path="/"
              user={state.user}
              logout={() => {
                window.localStorage.removeItem("token");
                setState({ user: null });
              }}
            />
            <LoginForm
              path="/register"
              endpoint="register"
              onSuccess={user => setState({ user })}
            />
            <LoginForm
              path="/login"
              endpoint="login"
              onSuccess={user => setState({ user })}
            />
          </Router>
        </LoadUser>
      );
    }}
  </Component>,
  document.getElementById("app")
);
