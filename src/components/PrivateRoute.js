import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/user";

export default function PrivateRoute({ children, ...rest }) {
  //console.log(rest);
  const { user } = React.useContext(UserContext);
  //console.log({ children });
  return (
    <Route
      {...rest}
      render={() => {
        return user.token ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
}
