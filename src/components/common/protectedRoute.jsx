import React from "react";

import { Route, Redirect } from "react-router-dom";

import auth from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  // render is a function
  // Component is for dynamically rendering a Component
  return (
    <Route
      //   path={path} this line is covered by ...rest
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location, // location represents the current location before the redirect to login page
                },
              }}
            ></Redirect>
          );
        return Component ? <Component {...props}></Component> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
