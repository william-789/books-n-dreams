import React from 'react';
import { Route } from 'react-router-dom';
import { useUser } from "../context/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogged, openModal } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged() ? (
          <Component {...props} />
        ) : (
          openModal()
        )
      }
    />
  );
};

export default PrivateRoute;
