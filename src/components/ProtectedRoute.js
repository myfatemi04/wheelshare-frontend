import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/profile`,
        requestOptions
      );

      console.log(`Checking status! ${response.status}`);
      if (response.status === 200) {
        return true;
      } else {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: { refresh: localStorage.getItem("refresh") },
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/token/refresh/`,
          requestOptions
        );

        const data = response.json();

        localStorage.setItem("token", data.access);

        return false;
      }
    } catch (e) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { refresh: localStorage.getItem("refresh") },
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/token/refresh/`,
        requestOptions
      );

      const data = response.json();

      localStorage.setItem("token", data.access);

      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated()) {
          return <Component {...props} {...rest} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
